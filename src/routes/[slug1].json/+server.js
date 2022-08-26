
// @migration task: Check imports
export const folderFromPath = (path) => path.match(/([\w-]+)\/(\/index)?\.(svelte\.md|md|svx)/i)?.[1] ?? null;
import { slugFromPath,  } from '$lib/util';
// import { page } from '$app/stores';


// const pathname = $page.url.pathname;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ url, params }) {
	let modules = [];
	let folder = '';
	if(params.slug1 === 'index'){
		modules = {
			...(import.meta.glob(`../../content/*/index.{md,svx,svelte}`)),
			...(import.meta.glob(`../../content/*.{md,svx,svelte}`))
		};
	} else {
		folder = `${params.slug1}/`
		modules = {
			...(import.meta.glob(`../../content/*/*/index.{md,svx,svelte}`)),
			...(import.meta.glob(`../../content/*/*.{md,svx,svelte}`))
		};
	}

	let matches = Object.fromEntries(
		Object.entries(modules).filter(([path, resolver]) => {
			let filename = slugFromPath(path);
			return (filename.startsWith(folder))
		}
	));

	const limit = Number(url.searchParams.get('limit') ?? Infinity);
	const orderBy = Number(url.searchParams.get('orderBy') ?? null);

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
