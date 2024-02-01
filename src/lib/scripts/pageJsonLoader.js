import { slugFromPath,  } from '$lib/scripts/util.js';

export async function loadJson({ params }) {
    const slugArray = Object.values(params);
    let lang = 'de';

	const modules = import.meta.glob(`$lib/../{content/**/,content}{[!!][!index]*,*/index}{.,.de.,.en.}page`)

    if(slugArray[0] == 'de') {
        slugArray.shift();
    } else if(slugArray[0] == 'en') {
		lang = 'en';
        slugArray.shift();
    }

    const regex = new RegExp(`^${slugArray.join('/')}/[^/]+$`);

	let matchesCurrentPath = Object.entries(modules)
        .filter(([path]) => regex.test(slugFromPath(path)));

	let matches = {};

	matchesCurrentPath.forEach(([path, value]) => {
		const pathWithoutLang = path.replace(/\.de\.|\.en\./, '.');
		const isCurrentLanguagePath = path.includes(`.${lang}.page`);
		const isLanguagePath = /(\.de\.|\.en\.)page/.test(path);
		const currentLangPath = pathWithoutLang.replace(/\.page/, `.${lang}.page`)

		// Stop if current lang is allready in the array, or if it is a language path for another language
		if (matches[currentLangPath] || (isLanguagePath && !isCurrentLanguagePath)) {
			return;
		} else if(isCurrentLanguagePath) {
			matches[path] = value;
			if (matches[pathWithoutLang]) {
				delete matches[pathWithoutLang];
			}
		} else {
			matches[path] = value;
		}
	});

    // if(matches.length == 0 && lang != 'de') {
    //     matches = Object.fromEntries(
    //         Object.entries(modules_de)
    //         .filter(([path]) => regex.test(slugFromPath(path)))
    //     );
    // }

	// const limit = Number(url.searchParams.get('limit') ?? Infinity);
	// const orderBy = Number(url.searchParams.get('orderBy') ?? null);
	const limit = Infinity;

	if (Number.isNaN(limit)) {
		return {
			status: 400
		};
	}

	let posts = [];

	for (let [path, resolver] of Object.entries(matches)) {
		const slug = slugFromPath(path);
		const Page = await resolver();
		Page.default.render() // Make sure rehype plugins are parsed
		let pageMeta = ({
				slug,
				...Page.metadata
			})
		posts.push(pageMeta);
	}

	const publishedPosts = posts.filter((post) => post.published).slice(0, limit);

	// if(orderBy != undefined) {
	// 	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
	// }

	return JSON.stringify(publishedPosts.slice(0, limit));
}
