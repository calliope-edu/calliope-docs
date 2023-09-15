<script>
    import ProseDecorator from './../Decorators/ProseDecorator.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import SvelteLogo from '~icons/logos/svelte-icon'

	import Zigzag from '../../lib/components/elements/Zigzag.svelte';
</script>

<Meta
	title="Elements/Zigzag"
	component={Zigzag}
	argTypes={{
		color: { options: ['calliope', 'rosa', 'blau', 'gruen', 'lila', 'gelb', 'apricot', 'grau', 'regenbogen'],
                control: { type: 'inline-radio' },
            },
	}}
/>

<Template let:args>
    <ProseDecorator>
	<Zigzag {...args}>
		<div />
    </Zigzag>
</ProseDecorator>
</Template>

<Story name="Default" args={{color: 'calliope'}} />

<Story name="Farben">
    <Zigzag color='calliope' />
    <Zigzag color='rosa' />
    <Zigzag color='blau' />
    <Zigzag color='gruen' />
    <Zigzag color='lila' />
    <Zigzag color='gelb' />
    <Zigzag color='apricot' />
    <Zigzag color='grau' />
    <Zigzag color='regenbogen' />
</Story>

<style>
</style>
