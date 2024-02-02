export const prerender = true;

import { loadJson } from '$lib/scripts/pageJsonLoader.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {

	console.log(params)
	
	return new Response(await loadJson({ params }));
}
