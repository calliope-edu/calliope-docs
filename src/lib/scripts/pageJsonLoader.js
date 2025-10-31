import { slugFromPath,  } from '$lib/scripts/util.js';
import { defaultLanguage } from '$lib/scripts/store.js';
import { locales, getLocale } from "$lib/paraglide/runtime"
import { browser } from '$app/environment';
import { render } from 'svelte/server';

export async function loadJson({ params }) {
	const slugArray = params.slugs.split('/').filter(Boolean) ?? [];;
    let lang = defaultLanguage.key; // Default to the default language from the store
	
 	if (slugArray[0] && locales.includes(slugArray[0])) {
		lang = slugArray[0];
		slugArray.shift();
	} else if (browser) {
		const acceptLanguage = navigator.language;
		const matchedLang = locales.find((key) => acceptLanguage.startsWith(key));
		if (matchedLang) {
			lang = matchedLang;
		}
	}

	const modules = import.meta.glob(`$lib/../{content/**/,content}{[!!][!index]*,*/index}{,.??}.page`)

    // Create two regex patterns - one for the exact current page and one for subpages
    const currentPageRegex = new RegExp(`^${slugArray.join('/')}$`);
    const subpagesRegex = new RegExp(`^${slugArray.join('/')}/[^/]+$`);
    const languageExtensionRegex = new RegExp(`\\.(${locales.join('|')})\\.page`);

    // Find potential matches for current page
    let currentPageMatches = Object.entries(modules)
        .filter(([path]) => currentPageRegex.test(slugFromPath(path)));

    // Find subpages
    let matchesCurrentPath = Object.entries(modules)
        .filter(([path]) => subpagesRegex.test(slugFromPath(path)));

	let matches = {};
	let currentPage = {};
	let currentLangPage

	// Process current page matches with language preference
    if (currentPageMatches.length > 0) {
        // Look for current language version first
        let currentLangPageEntry = currentPageMatches.find(([path]) => 
            path.includes(`.${lang}.page`));
        
        // If not found, use default version (without language suffix)
        if (!currentLangPageEntry) {
            currentLangPageEntry = currentPageMatches.find(([path]) => 
                !languageExtensionRegex.test(path));
        }
        
        // If still not found, use any available version
        if (!currentLangPageEntry && currentPageMatches.length > 0) {
            currentLangPageEntry = currentPageMatches[0];
        }
        
        if (currentLangPageEntry) {
            currentLangPage = {
                path: currentLangPageEntry[0],
                resolver: currentLangPageEntry[1]
            };
        }
    }

	// Process subpages
	matchesCurrentPath.forEach(([path, value]) => {
		const pathWithoutLang = path.replace(languageExtensionRegex, '.page');
		const isCurrentLanguagePath = path.includes(`.${lang}.page`);
		const isLanguagePath = languageExtensionRegex.test(path);
		const currentLangPath = pathWithoutLang.replace(/\.page/, `.${lang}.page`)

		// Stop if current lang is allready in the array, or if it is a language path for another language
		if (matches[currentLangPath] || (isLanguagePath && !isCurrentLanguagePath)) {
			return;
		} else if(isLanguagePath && isCurrentLanguagePath) {
			if (matches[pathWithoutLang]) {
				delete matches[pathWithoutLang];
			}
			matches[path] = value;
		} else {
			matches[path] = value;
		}
	});

	const limit = Infinity;

	if (Number.isNaN(limit)) {
		return {
			status: 400
		};
	}

	let currentPageMeta = {};
	if (currentLangPage && currentLangPage.resolver && typeof currentLangPage.resolver === 'function') {
		try {
			const PageCurrent = await currentLangPage.resolver();
			render(PageCurrent.default); // Make sure rehype plugins are parsed
			currentPageMeta = {
				slug: slugFromPath(currentLangPage.path),
				...PageCurrent.metadata
			};
		} catch (error) {
			console.error("Error resolving current page:", error);
			currentPageMeta = {
				slug: slugArray.join('/'),
				title: "Error Loading Page"
			};
		}
	} else {
		// If no current page is found, we need a fallback
		console.warn('No current page found for the requested path');
		currentPageMeta = {
			slug: slugArray.join('/'),
			title: 'Page Not Found'
		};
	}

	let posts = [];
	for (let [path, resolver] of Object.entries(matches)) {
		const slug = slugFromPath(path);
		const Page = await resolver();
		render(Page.default) // Make sure rehype plugins are parsed
		let pageMeta = ({
				slug,
				...Page.metadata
			})
		posts.push(pageMeta);
	}


	const publishedPosts = posts.filter((post) => post.published).slice(0, limit);

	// if(orderBy != undefined) {
	// 	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
	// }

	return JSON.stringify({
		lang,
		pageMeta: currentPageMeta,
		subpages: publishedPosts.slice(0, limit)
	});
}
