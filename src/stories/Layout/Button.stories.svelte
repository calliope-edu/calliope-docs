<script>
	import ProseDecorator from './../Decorators/ProseDecorator.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import Button from '../../lib/components/elements/Button.svelte';

</script>

<Meta 
    title="Elements/Button" 
    component={Button}
    argTypes={{
        download: { description: 'Force a download `true` or provide a name' },
    }}
/>

<Template let:args>
    <ProseDecorator>
        <Button {...args} />
    </ProseDecorator>
</Template>

<Story name="Default"  args={{text: "Button", link: '', type: 'default', color: 'slate-600'}} />

<Story name="Bordered" args={{text: "Button", link: './index.zip', type: 'border', color: 'calliope-500', download: "INDEX.zip"}}/>

<Story name="External" args={{text: "Button", link: 'https://google.de'}}/>


<Story name="None" args={{}}/>
