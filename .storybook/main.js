const workaroundSvelteDocgenPluginConflictWithUnpluginIcons = (config) => {
	if (!config.plugins) return config;

	const [_internalPlugins, ...userPlugins] = config.plugins;
	const docgenPlugin = userPlugins.find(
		(plugin) => plugin.name === 'storybook:svelte-docgen-plugin'
	);
	if (docgenPlugin) {
		const origTransform = docgenPlugin.transform;
		const newTransform = (code, id, options) => {
			if (id.startsWith('~icons/')) {
				return;
			}
			return origTransform?.call(docgenPlugin, code, id, options);
		};
		docgenPlugin.transform = newTransform;
		docgenPlugin.enforce = 'post';
	}
	return config;
};

/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)'
	],
	addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-svelte-csf',
        {
			name: '@storybook/addon-styling',
			options: {}
		},
		'@storybook/addon-docs',
    ],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: true
	},
	viteFinal(config) {
		return workaroundSvelteDocgenPluginConflictWithUnpluginIcons(config);
	}
};
export default config;
