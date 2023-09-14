<script>
    import ProseDecorator from './../Decorators/ProseDecorator.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import SvelteLogo from '~icons/logos/svelte-icon'

	import Divider from '../../lib/components/elements/Divider.svelte';
</script>

<Meta
	title="Elements/Divider"
	component={Divider}
	argTypes={{
		color: { options: ['calliope', 'rosa', 'blau', 'gruen', 'lila', 'gelb', 'apricot', 'grau', 'regenbogen'],
                control: { type: 'inline-radio' },
            },
	}}
/>

<Template let:args>
    <ProseDecorator>
	<Divider {...args}>
		<div />
    </Divider>
</ProseDecorator>
</Template>

<Story name="Default" args={{color: 'grau'}} />


<Story name="Inhalt">
	<ProseDecorator>
		<Divider border rounded>
			1
        </Divider>

        <Divider rounded>
			A
        </Divider>
        
        <Divider border>
			1
        </Divider>
        
        <Divider>
			<SvelteLogo />
		</Divider>
	</ProseDecorator>
</Story>

<Story name="Farben">
    <Divider color='calliope'>1</Divider>
    <Divider color='rosa'>2</Divider>
    <Divider color='blau'>3</Divider>
    <Divider color='gruen'>4</Divider>
    <Divider color='lila'>5</Divider>
    <Divider color='gelb'>6</Divider>
    <Divider color='apricot'>7</Divider>
    <Divider color='grau'>8</Divider>
    <Divider color='regenbogen'>9</Divider>
</Story>

<style>
</style>
