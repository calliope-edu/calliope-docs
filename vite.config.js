// import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		// paraglide({
		// 	project: './project.inlang',
		// 	outdir: './src/lib/paraglide'
		// }),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'localStorage', "preferredLanguage", 'baseLocale'],
			disableAsyncLocalStorage: true,
			urlPatterns: [
				{
					pattern: "/:path(.*)?",
					localized: [
						["de", "/de/:path(.*)?"],
						["en", "/en/:path(.*)?"],
					],
				},
			],
		}),
		Icons({
			defaultStyle: '',
			defaultClass: '',
			compiler: 'svelte',
		}),
	],
	assetsInclude: ['**/*.hex', '**/*.xml', '**/*.pdf', '**/*.uf2', '**/*.zip'],
	server: {
		proxy: {
			'/api': {
			target: 'http://localhost:3000',
			changeOrigin: true
			}
		}
	}
});
