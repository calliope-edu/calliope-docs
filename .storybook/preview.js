/* Global styles for Storybook */
import '../src/scss/app.scss';
/** @type { import('@storybook/sveltekit').Preview } */
const preview = {
    parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	},

    decorators: [
		// Adds theme switching support.
		// NOTE: requires setting "darkMode" to "class" in your tailwind config
		// withThemeByClassName({
		// 	themes: {
		// 		light: 'light',
		// 		dark: 'dark'
		// 	},
		// 	defaultTheme: 'light'
		// })
	],

    tags: ['autodocs']
};

export default preview;
