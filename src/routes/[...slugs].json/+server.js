export const prerender = true;

import { redirect } from '@sveltejs/kit';
import { loadJson } from '$lib/scripts/pageJsonLoader.js';
import { resolveLegacyRedirect } from '$lib/scripts/redirects.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
	const legacyRedirect = resolveLegacyRedirect(params.slugs, {
		suffix: '.json'
	});

	if (legacyRedirect) {
		redirect(308, legacyRedirect);
	}

	return new Response(await loadJson({ params }));
}
