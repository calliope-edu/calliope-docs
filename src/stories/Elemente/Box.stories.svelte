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
		color: { options: ['calliope', 'rosa', 'blau', 'gruen', 'lila', 'gelb', 'apricot', 'grau', 'regenbogen'],
                control: { type: 'inline-radio' },
            },
	}}
/>

<Template let:args>
    <ProseDecorator>
	<Box {...args}>
		<div />
    </Box>
</ProseDecorator>
</Template>

<Story name="Default" args={{color: 'grau'}} />


<Story name="Inhalt">
	<ProseDecorator>
		<Box border rounded>
			1
        </Box>

        <Box rounded>
			A
        </Box>
        
        <Box border>
			1
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
