import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { slugFromPath } from '$lib/scripts/util.js';
import { defaultLanguage } from '$lib/scripts/store.js';

// import { page } from '$app/state';
import { locales, getLocale } from "$lib/paraglide/runtime"

export async function loadPage({ params }) {
    const pageSlug = params?.slugs ?? '/';
    
    // The fix: Handle initial load language detection properly
    let lang;
    
    if (browser) {
        // On client-side, detect if this is the initial load
        const initialLoad = !window.LANGUAGE_INITIALIZED;
        
        if (initialLoad) {
            // Try to detect language from URL first (most reliable)
            const pathParts = window.location.pathname.split('/');
            const urlLang = pathParts[1];
            
            if (locales.includes(urlLang)) {
                lang = urlLang;
            } else {
                // Fallback to default language on initial load
                lang = defaultLanguage.key;
            }
            // Mark language as initialized for future navigation
            window.LANGUAGE_INITIALIZED = true;
        } else {
            // For subsequent navigation, getLocale() works correctly
            lang = getLocale();
        }
    } else {
        // On server-side, getLocale() works correctly
        lang = getLocale();
    }
    
    // console.log(`Loading page: ${pageSlug}, language: ${lang}, browser: ${browser}, available languages: ${locales.join(', ')}`);

    const allFiles = import.meta.glob(
        '$lib/../{content/**/,content}{[!!][!index]*,*/index}{,.??}.page',
        { eager: true }
      );

    // Filter files based on language codes
    const filesByLanguage = Object.fromEntries(
        locales.map((lng) => [
            lng,
            Object.fromEntries(Object.entries(allFiles).filter(([path]) => path.endsWith(`.${lng}.page`))),
        ])
    );
    
    // Filter fallback files (those not matching any language code)
    const languageExtensions = locales.map(lang => `.${lang}.page`);
    const fallback = Object.fromEntries(
        Object.entries(allFiles).filter(([path]) => !languageExtensions.some(ext => path.endsWith(ext)))
    );
    
    // Combine fallback and language-specific files
    const pagesMap = { fallback, ...filesByLanguage };
    
	let match;

    // 1. Versuche die gewünschte Sprache
    // 2. Fallback auf defaultLanguage, falls nicht gefunden
    // 3. Letzter Fallback: irgendeine verfügbare Sprache
    const fallbackLanguages = locales.filter(l => l !== lang && l !== defaultLanguage.code);

    for (const language of [lang, 'fallback', defaultLanguage.code, ...fallbackLanguages]) {
    if (!match) {
        for (const [path, resolver] of Object.entries(pagesMap[language] || {})) {
        if (slugFromPath(path)+'/' === pageSlug || 
            (pageSlug === '/' && slugFromPath(path) === 'index')) {
            match = [path, resolver];
            break;
        }
        }
    }
    }

    if (!match) {
    error(404);
    }
	
    const Page = match[1].default;
	let meta = match[1].metadata ?? {}
    meta.filepath = match[0];

	return {
		Page,
		meta
	};
}
