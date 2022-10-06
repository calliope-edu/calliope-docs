<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';


    import Button from '../lib/components/elements/Button.svelte';


</script>

<Meta 
    title="Elements/Button" 
    component={Button}
    argTypes={{
        // h: { control: 'number', description: 'Height of Button in `rem`' },
    }}
/>

<Template let:args>
    <Button {...args} />
</Template>

<Story name="Default"  args={{text: "Button", link: './i', type: 'default', color: 'slate-600', download: false}} />

<Story name="Bordered" args={{text: "Button", link: './index.zip', type: 'border', color: 'calliope-500', download: "INDEX.zip"}}/>

<Story name="None" args={{}}/>
