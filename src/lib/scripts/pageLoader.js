import { error } from '@sveltejs/kit';

import { slugFromPath } from '$lib/scripts/util.js';

export async function loadPage({ params }) {

    const slugArray = Object.values(params);
    let lang = 'de';

    if(slugArray[0] == 'de') {
        slugArray.shift();
    } else if(slugArray[0] == 'en') {
        lang = 'en';
        slugArray.shift();
    }
    //const depth = slugArray.length;
    //const baseGlob = `$lib/../content/${'*'.repeat(depth)}{[!index]*,*/index}`;
    
	const pagesMap = {
     'de': import.meta.globEager(`$lib/../content/**/{[!!][!index]*,*/index}{.,.de.}page`),
     'en': import.meta.globEager(`$lib/../content/**/{[!!][!index]*,*/index}.en.page`)
    };

	let match;

    for (const [path, resolver] of Object.entries(pagesMap[lang])) {
        if (slugFromPath(path) === `${slugArray.join('/')}`) {
            match = [path, resolver];
            break;
        }
    }

    if (!match && lang != 'de') {
        for (const [path, resolver] of Object.entries(pagesMap['de'])) {
            if (slugFromPath(path) === `${slugArray.join('/')}`) {
                match = [path, resolver];
                break;
            }
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
