import { error } from '@sveltejs/kit';

import { slugFromPath } from '$lib/scripts/util.js';

export async function loadPage({ params }) {

    const slugArray = Object.values(params);
    //const depth = slugArray.length;
    //const baseGlob = `$lib/../content/${'*'.repeat(depth)}{[!index]*,*/index}`;
    
    console.log(slugArray)

	const pages = await import.meta.globEager(`$lib/../content/**/{[!index]*,*/index}{.,.de.,.en.}page`)
	let match;

    for (const [path, resolver] of Object.entries(pages)) {
        if (slugFromPath(path) === `${slugArray.join('/')}`) {
            match = [path, resolver];
            break;
        }
    }

    if (!match) {
        throw error(404);
    }
	
    const Page = match[1].default;
	let meta = match[1].metadata ?? {}
    meta.filepath = match[0];

	return {
		Page,
		meta
	};
}
