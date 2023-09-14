<script>
    import ProseDecorator from './../Decorators/ProseDecorator.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import SvelteLogo from '~icons/logos/svelte-icon'

	import Admonition from '../../lib/components/kit-docs/custom/Admonition.svelte';
</script>

<Meta
	title="Elements/Admonition"
	component={Admonition}
	argTypes={{
		type: { options: ['note', 'info', 'tip', 'warning', 'danger', 'experimental'],
                control: { type: 'inline-radio' },
            },
	}}
/>

<Template let:args>
    <ProseDecorator>
	<Admonition {...args}>
		<div />
    </Admonition>
</ProseDecorator>
</Template>

<Story name="Default" args={{}} />

<Story name="Typen">
    <Admonition type='note'>note</Admonition>
    <Admonition type='info'>info</Admonition>
    <Admonition type='tip'>tip</Admonition>
    <Admonition type='warning'>warning</Admonition>
    <Admonition type='danger'>danger</Admonition>
    <Admonition type='experimental'>experimental</Admonition>
</Story>

<style>
</style>
