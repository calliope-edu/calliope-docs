import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import Icons from 'unplugin-icons/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		imagetools({ force: true }),
		Icons({
			defaultStyle: '',
			defaultClass: '',
			compiler: 'svelte',
		  }),
	],
	// publicDir: 'static_' // gets overwritten by sveltekit
};

export default config;
