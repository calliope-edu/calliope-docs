import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import Icons from 'unplugin-icons/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		imagetools({ force: true }),
		Icons({
			compiler: 'svelte',
		}),
	]
};

export default config;
