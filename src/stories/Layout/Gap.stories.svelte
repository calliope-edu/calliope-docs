<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';


    import Gap from '../../lib/components/layout/Gap.svelte'


</script>

<Meta 
    title="Layout/Gap" 
    component={Gap}
    argTypes={{
        h: { control: 'number', description: 'Height of Gap in `rem`' },
    }}
/>

<Template let:args>
    <div></div>
    <Gap {...args} />
    <div></div>
</Template>

<Story name="Default h=1" />

<Story name="Small h=0.5" args={{h: 0.5}}/>

<Story name="None h=0" args={{h: 0}}/>

<Story name="Large h=4" args={{h: 4}}/>


<style>
    div {
        padding: 1rem;
        background: grey;
        background-image: linear-gradient(to bottom right, grey , silver);
    }
</style>