<script>
	import ProseDecorator from './../Decorators/ProseDecorator.svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Inline from '../../lib/components/layout/Inline.svelte';
	import Box from '../../lib/components/elements/Box.svelte';
</script>

<Meta
	title="Layout/Inline"
	component={Inline}
	argTypes={{
		align: { control: 'text', description: 'left, right, end' }
	}}
/>

<Template let:args>
	<Inline {...args}>
		<div />
		<div />
		<div />
	</Inline>
</Template>

<Story name="Elemente Anordnen">
	<ProseDecorator>
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
	</ProseDecorator>
</Story>
