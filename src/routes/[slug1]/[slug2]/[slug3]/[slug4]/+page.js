import { loadPage } from '$lib/scripts/pageLoader';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ params }) {

   return await loadPage({ params });
   
}
