import { error } from '@sveltejs/kit';

import { slugFromPath } from '$lib/util';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ url, fetch, params }) {

	let Page;

	const pagesIndex = await import.meta.globEager(`../../../content/*/*/index{.,.de.,.en.}{md,svx,svelte}`);
	const pagesFolders = await import.meta.globEager(`../../../content/*/*{.,.de.,.en.}{md,svx,svelte}`);
	const pages = {...pagesIndex, ...pagesFolders}
	let match;
        for (const [path, resolver] of Object.entries(pages)) {
            if (slugFromPath(path) === `${params.slug1}/${params.slug2}`) {
                match = [path, resolver];
                break;
            }
        }

        if (!match) {
            throw error(404);
        }

	
    Page = match[1].default;
	let meta = match[1].metadata ?? {}		

	return {
		Page,
		meta
	};
}
