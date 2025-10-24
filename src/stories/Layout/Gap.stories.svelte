<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Gap from '../../lib/components/layout/Gap.svelte';

	const { Story } = defineMeta({
		title: 'Layout/Gap',
		component: Gap,
		argTypes: {
			h: { control: 'number', description: 'Height of Gap in `rem`' }
		}
	});
</script>

<Story name="All Props" args={{ h: 1 }}>
    {#snippet template(args)}
        <div>Block Above</div>
        <Gap {...args} />
        <div>Block Below</div>
    {/snippet}
</Story>

<Story name="Default h=1">
    {#snippet template(args)}
        <div>Block Above</div>
        <Gap {...args} />
        <div>Block Below</div>
    {/snippet}
</Story>

<Story name="Small h=0.5" args={{ h: 0.5 }}>
    {#snippet template(args)}
        <div>Block Above</div>
        <Gap {...args} />
        <div>Block Below</div>
    {/snippet}
</Story>

<Story name="None h=0" args={{ h: 0 }}>
    {#snippet template(args)}
        <div>Block Above</div>
        <Gap {...args} />
        <div>Block Below</div>
    {/snippet}
</Story>

<Story name="Large h=4" args={{ h: 4 }}>
    {#snippet template(args)}
        <div>Block Above</div>
        <Gap {...args} />
        <div>Block Below</div>
    {/snippet}
</Story>


<style>
    div {
        padding: 1rem;
        background: grey;
        background-image: linear-gradient(to bottom right, grey , silver);
    }
</style>