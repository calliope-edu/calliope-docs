import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { imagetools } from 'vite-imagetools';
import Icons from 'unplugin-icons/vite'
// import autoImport from 'sveltekit-autoimport';

export default defineConfig({
	plugins: [

		// autoImport({
		// 	// where to search for the components
		// 	components: [
		// 	  { name: './src/lib/components/', flat: true },
		// 	],
		// 	include: ['**/*.page'],	  
		//   }),

		sveltekit(),
		imagetools(),
		Icons({
			defaultStyle: '',
			defaultClass: '',
			compiler: 'svelte',
		  }),
		],
		assetsInclude: ['**/*.hex', '**/*.xml', '**/*.pdf', '**/*.uf2', '**/*.zip'],
});
