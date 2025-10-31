<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
		import Inline from '../../lib/components/layout/Inline.svelte';
	import Box from '../../lib/components/elements/Box.svelte';

	const { Story } = defineMeta({
		title: 'Layout/Inline',
		component: Inline,
		argTypes: {
			align: {
				control: 'radio',
				options: ['left', 'center', 'right', 'end'],
				description: 'Alignment: left, center, right, or end'
			}
		}
	});
</script>

<Story name="All Props" args={{ align: 'left' }}>
	{#snippet template(args)}
		<Inline {...args}>
			<Box color="rosa" rounded>1</Box>
			<Box color="blau" rounded>2</Box>
			<Box color="gruen" rounded>3</Box>
		</Inline>
	{/snippet}
</Story>

<Story name="Default">
	{#snippet template(args)}
		<Inline {...args}>
			<div></div>
			<div></div>
			<div></div>
		</Inline>
	{/snippet}
</Story>

<Story name="Elemente Anordnen">
	{#snippet template(args)}
		<Inline align="left">
			<Box color="rosa" rounded>1</Box>
			<h1>linksbündig</h1>
		</Inline>

		<Inline align="center">
			<Box color="rosa">2</Box>
			<h1>mittig</h1>
		</Inline>

		<Inline align="end">
			<Box color="rosa">3</Box>
			<h1>rechtsbündig</h1>
		</Inline>
	{/snippet}
</Story>
