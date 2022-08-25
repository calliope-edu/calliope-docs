import { error } from '@sveltejs/kit';

import { slugFromPath } from '$lib/util';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ url, fetch, params }) {

	const subJson = await fetch('/index.json').then((res) => res.json());
	
	let _subpages = [];
	for (const page of subJson) {
		const pageJson = await fetch(`/${page.slug}.json`).then((res) => res.json());
		_subpages[page.slug] = pageJson;
	}

	let Page;

	const pages = await import.meta.globEager(`../content/index{.,.de.,.en.}{md,svx}`);
	let match;
        for (const [path, resolver] of Object.entries(pages)) {
            if (slugFromPath(path) === 'index') {
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
