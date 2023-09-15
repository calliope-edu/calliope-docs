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

	const pages = await import.meta.globEager(`../../content/{[!index]*,*/index}{.,.de.,.en.}page`)

	// console.log(pages)

	let match;
        for (const [path, resolver] of Object.entries(pages)) {
            if (slugFromPath(path) === params.slug1) {
				slugFromPath('oK')
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
