const workaroundSvelteDocgenPluginConflictWithUnpluginIcons = (config) => {
	if (!config.plugins) return config;

	// Remove or disable the storybook:svelte-docgen-plugin which is known to
	// conflict with some project-specific syntax and unplugin-icons. The
	// plugin currently throws `this.parse is not a function` during transform
	// for some files; disabling it avoids those internal server errors while
	// keeping Storybook usable. If component docs are needed later, we can
	// re-enable or replace the plugin with a safe alternative.
	config.plugins = config.plugins.filter(
		(plugin) => plugin && plugin.name !== 'storybook:svelte-docgen-plugin'
	);
	return config;
};

/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
    stories: [
		'../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)'
	],

    addons: ['@storybook/addon-svelte-csf', '@storybook/addon-docs'],

    framework: {
		name: '@storybook/sveltekit',
		options: {}
	},

    viteFinal(config) {
		// Ensure Vite can serve files from the project root and .storybook on all platforms
		config.server = config.server || {};
		config.server.fs = config.server.fs || {};
		const allow = new Set([...(config.server.fs.allow || [])]);
		['.', './', '..', './.storybook', '.storybook'].forEach((p) => allow.add(p));
		config.server.fs.allow = Array.from(allow);

		return workaroundSvelteDocgenPluginConflictWithUnpluginIcons(config);
	}
};
export default config;
