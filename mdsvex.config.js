import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkAbbr from 'remark-abbr';
import remarkUnwrapImages from "remark-unwrap-images";
import remarkRelativeImages from "mdsvex-relative-images";
import remarkContainers from 'remark-containers';
import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFrontmatterImport from './mdsvexplugins/mdsvex-frontmatter-to-import.js'


const config = defineConfig({
	layout: {
		_: "./src/lib/mdsvex/layouts/default.svelte"
	},
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		[remarkAbbr, { expandFirst: true }],
		remarkContainers,
		// [remarkMermaid, { simple: true }],
		// remarkGfm,
		remarkFrontmatterImport,
		remarkUnwrapImages,
		remarkRelativeImages,
	],
	rehypePlugins: [
		rehypeSlug,
		// [rehypeAutolinkHeadings, { behavior: 'before' }]
	]
});

export default config;
