<script context="module">
    import { defineMeta } from '@storybook/addon-svelte-csf';
		import SvelteLogo from '~icons/logos/svelte-icon';

	import Zigzag from '../../lib/components/elements/Zigzag.svelte';

	const { Story } = defineMeta({
		title: 'Elements/Zigzag',
		component: Zigzag,
		argTypes: {
			color: {
				options: ['calliope', 'rosa', 'blau', 'gruen', 'lila', 'gelb', 'apricot', 'grau', 'regenbogen'],
				control: { type: 'inline-radio' },
				description: 'Color of the zigzag pattern'
			},
			bg: {
				control: { type: 'text' },
				description: 'Background color name (default: white)'
			},
			size: {
				control: { type: 'number' },
				description: 'Size of zigzag pattern in pixels (default: 20)'
			},
			thikness: {
				control: { type: 'number' },
				description: 'Thickness/offset between layers (default: 4)'
			}
		}
	});
</script>

<Story name="All Props" args={{ color: 'calliope', size: 20, thikness: 4, bg: 'white' }}>
	{#snippet template(args)}
		<Zigzag {...args} />
	{/snippet}
</Story>

<Story name="Default" args={{ color: 'calliope' }}>
	{#snippet template(args)}
		<Zigzag {...args} />
	{/snippet}
</Story>

<Story name="Farben">
	{#snippet template(args)}
		<Zigzag color="calliope" />
		<Zigzag color="rosa" />
		<Zigzag color="blau" />
		<Zigzag color="gruen" />
		<Zigzag color="lila" />
		<Zigzag color="gelb" />
		<Zigzag color="apricot" />
		<Zigzag color="grau" />
		<Zigzag color="regenbogen" />
	{/snippet}
</Story>
