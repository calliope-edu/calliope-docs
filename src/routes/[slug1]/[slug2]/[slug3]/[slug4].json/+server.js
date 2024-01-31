// @migration task: Check imports
export const _folderFromPath = (path) => path.match(/([\w-]+)\/(\/index)?\.(svelte\.md|md|svx|page)/i)?.[1] ?? null;
export const prerender = true;

import { slugFromPath,  } from '$lib/scripts/util.js';
// import { page } from '$app/stores';

// const pathname = $page.url.pathname;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ url, params }) {
	const modules = import.meta.glob(`../../../../../content/*/*/*/*/{[!index]*,*/index}{.,.de.,.en.}page`)
	// console.log(modules)
	let matches = Object.fromEntries(
		Object.entries(modules).filter(([path, resolver]) => {
			// console.log(path);
			const filename = slugFromPath(path);
			// console.log(filename);
			return (filename.startsWith(`${params.slug1}/${params.slug2}/${params.slug3}/${params.slug4}/`))
		}
	));

	// const limit = Number(url.searchParams.get('limit') ?? Infinity);
	// const orderBy = Number(url.searchParams.get('orderBy') ?? null);
	const limit = Infinity;
	const orderBy = null;

	if (Number.isNaN(limit)) {
		return {
			status: 400
		};
	}
	let posts = [];

	for (let [path, resolver] of Object.entries(matches)) {
		const slug = slugFromPath(path);
		const Page = await resolver();
		const PageRendered = Page.default.render() // Make sure rehype plugins are parsed
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

	return new Response(JSON.stringify(publishedPosts.slice(0, limit)));
}
