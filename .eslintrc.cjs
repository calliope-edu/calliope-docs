module.exports = {
	root: true,
	extends: [
        "eslint:recommended",
        "plugin:svelte/recommended",
        "prettier",
        "plugin:storybook/recommended"
    ],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	settings: {
		'svelte3/ignore-warnings': (warning) => {
		  return warning.code === 'a11y-click-events-have-key-events'
		},
	}
};