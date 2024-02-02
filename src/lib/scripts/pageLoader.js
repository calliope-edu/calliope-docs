import { error } from '@sveltejs/kit';

import { slugFromPath } from '$lib/scripts/util.js';

export async function loadPage({ params }) {
    const slugArray = params.slugs.split('/').filter((str) => str !== "");;
    // console.log(slugArray)
    // const slugArray = Object.values(params);
    
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
     'de': import.meta.globEager(`$lib/../{content/**/,content}{[!!][!index]*,*/index}{.,.de.}page`),
     'en': import.meta.globEager(`$lib/../{content/**/,content}{[!!][!index]*,*/index}.en.page`)
    };

	let match;

    for (const [path, resolver] of Object.entries(pagesMap[lang])) {
        if (slugFromPath(path) === `${slugArray.join('/')}` || `${slugArray.join('/')}` == '' && slugFromPath(path) == 'index') {
            match = [path, resolver];
            break;
        }
    }

    if (!match && lang != 'de') {
        for (const [path, resolver] of Object.entries(pagesMap['de'])) {
            // console.log('slug:', slugFromPath(path))
            if (slugFromPath(path) === `${slugArray.join('/')}` || `${slugArray.join('/')}` == '' && slugFromPath(path) == 'index') {
                match = [path, resolver];
                break;
            }
        }
    }

    if (!match) {
        // console.log('test', slugArray.join('/'))
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
