import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess()
	],

	kit: {
		trailingSlash: 'always',
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true
		}),
		prerender: {
			// This can be false if you're using a fallback (i.e. SPA mode)
			default: true,
			onError: 'continue'
		}
	}
};

export default config;
