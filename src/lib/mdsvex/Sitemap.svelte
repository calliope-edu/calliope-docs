<script>
    import { slugFromPath } from '$lib/scripts/util.js';

    const modules = import.meta.glob(`../../{content/**/,content}[!!]*.md`)
	// console.log(modules)

	let posts = [];

	for (let [path, resolver] of Object.entries(modules)) {
		const slug = slugFromPath(path);
		// const Page = await resolver();
		// const PageRendered = Page.default.render() // Make sure rehype plugins are parsed
		let pageMeta = ({
				slug,
                depth: (slug.split("/").length - 1)
				// ...Page.metadata
			})
		posts.push(pageMeta);
	}

	// const publishedPosts = posts.filter((post) => post.published).slice(0, limit);

	// if(orderBy != undefined) {
	// 	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
	// }

	// export const sitemap = JSON.stringify(publishedPosts.slice(0, limit));
    export const sitemap = posts

    // console.log(sitemap)
</script>

{JSON.stringify(sitemap)}