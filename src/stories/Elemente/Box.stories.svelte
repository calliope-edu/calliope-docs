<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
		import SvelteLogo from '~icons/logos/svelte-icon';

	import Box from '../../lib/components/elements/Box.svelte';

	const { Story } = defineMeta({
		title: 'Elements/Box',
		component: Box,
		argTypes: {
			color: {
				options: ['calliope', 'rosa', 'blau', 'gruen', 'lila', 'gelb', 'apricot', 'grau', 'regenbogen'],
				control: { type: 'inline-radio' },
				description: 'Color of the box'
			},
			border: {
				control: 'boolean',
				description: 'Show border around the box'
			},
			rounded: {
				control: 'boolean',
				description: 'Round the corners of the box'
			}
		}
	});
</script>

<Story name="All Props" args={{ color: 'grau', border: false, rounded: false, content: 'Box Content' }}>
	{#snippet template(args)}
		<Box color={args.color} border={args.border} rounded={args.rounded}></Box>
	{/snippet}
</Story>

<Story name="Default" args={{ color: 'grau' }}>
	{#snippet template(args)}
		<Box {...args}>Default Content</Box>
	{/snippet}
</Story>

<Story name="Inhalt">
	{#snippet template(args)}
		<Box border rounded>1</Box>
		<Box rounded>A</Box>
		<Box border>1</Box>
		<Box>
			<SvelteLogo />
		</Box>
	{/snippet}
</Story>

<Story name="Farben">
	{#snippet template(args)}
		<Box color="calliope">1</Box>
		<Box color="rosa">2</Box>
		<Box color="blau">3</Box>
		<Box color="gruen">4</Box>
		<Box color="lila">5</Box>
		<Box color="gelb">6</Box>
		<Box color="apricot">7</Box>
		<Box color="grau">8</Box>
		<Box color="regenbogen">9</Box>
	{/snippet}
</Story>
