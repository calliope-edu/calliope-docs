import { error } from '@sveltejs/kit';

import { slugFromPath } from '$lib/util';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ url, fetch, params }) {

	const subJson = await fetch(`/${params.slug1}.json`).then((res) => res.json());
	// console.log(subJson)
	let _subpages = [];
	for (const page of subJson) {
		const pageJson = await fetch(`/${page.slug}.json`).then((res) => res.json());
		_subpages[page.slug] = pageJson;
		_subpages[page.slug]['meta'] = page
	}
	// console.log(_subpages)

	let Page;

	const pagesIndex = await import.meta.globEager(`../../content/*/index{.,.de.,.en.}{md,svx}`);
	const pagesFolders = await import.meta.globEager(`../../content/*{.,.de.,.en.}{md,svx}`);
	const pages = {...pagesIndex, ...pagesFolders}

	let match;
        for (const [path, resolver] of Object.entries(pages)) {
            if (slugFromPath(path) === params.slug1) {
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
		meta,
		_subpages
	};
}
