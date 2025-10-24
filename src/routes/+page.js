import { loadPage } from '$lib/scripts/pageLoader';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ params, depends }) {
   depends("paraglide:lang");
   return await loadPage({ params }); 
}
