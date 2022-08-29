import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkAbbr from 'remark-abbr';
import remarkUnwrapImages from "remark-unwrap-images";
import remarkRelativeImages from "mdsvex-relative-images";
import remarkContainers from 'remark-containers';
import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFrontmatterImport from './mdsvexplugins/mdsvex-frontmatter-to-import.js'
import remarkAutoloadComponents from './mdsvexplugins/mdsvex-import-components.js'
import remarkAutoloadTemplates from './mdsvexplugins/mdsvex-import-templates.js'

const config = defineConfig({
	layout: {
		_: "./src/lib/mdsvex/layouts/default.svelte"
	},
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		
	},

	remarkPlugins: [
		// [remarkAbbr, { expandFirst: true }], // parse html abbreviations
		// remarkContainers, // processes `:::`-Tags to html-tags
		// [remarkMermaid, { simple: true }],
		// remarkGfm,
		remarkFrontmatterImport, // looks for 'image' tag in frontmatter and makes them available/imports to page metadata
		remarkUnwrapImages, // removes p-tags arround images generated by markdown
		remarkRelativeImages, // Imports relative linked images and makes them available to vite imagetools
		remarkAutoloadComponents, // Adds js import scrip for components
		remarkAutoloadTemplates, // Adds js import script for templates
	],
	rehypePlugins: [
		rehypeSlug, // Add IDs to headings
		// [rehypeAutolinkHeadings, { behavior: 'before' }]
	]
});

export default config;
