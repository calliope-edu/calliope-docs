<script>
    import ProseDecorator from './../Decorators/ProseDecorator.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import SvelteLogo from '~icons/logos/svelte-icon'

	import Box from '../../lib/components/elements/Box.svelte';
</script>

<Meta
	title="Elements/Box"
	component={Box}
	argTypes={{
		h: { control: '', description: 'Height of Gap in `rem`' }
	}}
/>

<Template let:args>
    <ProseDecorator>
	<Box {...args}>
		<div />
    </Box>
</ProseDecorator>
</Template>

<Story name="Inhalt">
	<ProseDecorator>
		<Box border rounded>
			<h1>1</h1>
        </Box>

        <Box rounded>
			A
        </Box>
        
        <Box border>
			<h1>1</h1>
        </Box>
        
        <Box>
			<SvelteLogo />
		</Box>
	</ProseDecorator>
</Story>

<Story name="Farben">
    <Box color='calliope'>1</Box>
    <Box color='rosa'>2</Box>
    <Box color='blau'>3</Box>
    <Box color='gruen'>4</Box>
    <Box color='lila'>5</Box>
    <Box color='gelb'>6</Box>
    <Box color='apricot'>7</Box>
    <Box color='grau'>8</Box>
    <Box color='regenbogen'>9</Box>
</Story>

<style>
</style>
