import legacyRedirects from '$lib/scripts/redirects.json';
import { locales } from '$lib/paraglide/runtime';

// Maintain old -> new content slugs here when pages are renamed.
// Use paths without leading/trailing slashes and without locale prefixes.
export { legacyRedirects };

function normalizeSlugs(slugs = '') {
	return String(slugs)
		.replace(/^\/+/, '')
		.replace(/\/+$/, '')
		.replace(/\.json$/, '');
}

export function resolveLegacyRedirect(slugs, { suffix = '', search = '' } = {}) {
	const normalized = normalizeSlugs(slugs);

	if (!normalized) {
		return null;
	}

	const parts = normalized.split('/').filter(Boolean);
	const maybeLocale = parts[0];
	const hasLocale = locales.includes(maybeLocale);
	const localePrefix = hasLocale ? `/${maybeLocale}` : '';
	const contentPath = hasLocale ? parts.slice(1).join('/') : parts.join('/');
	const targetPath = legacyRedirects[contentPath];

	if (!targetPath) {
		return null;
	}

	const normalizedSearch = search
		? search.startsWith('?')
			? search
			: `?${search}`
		: '';
	const pathname = suffix
		? `${localePrefix}/${targetPath}${suffix}`
		: `${localePrefix}/${targetPath}/`;

	return `${pathname}${normalizedSearch}`;
}