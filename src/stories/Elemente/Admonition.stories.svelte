<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
		import SvelteLogo from '~icons/logos/svelte-icon';

	import Admonition from '../../lib/components/elements/Admonition.svelte';

	const { Story } = defineMeta({
		title: 'Elements/Admonition',
		component: Admonition,
		argTypes: {
			type: {
				options: ['note', 'info', 'tip', 'warning', 'danger', 'experimental'],
				control: { type: 'inline-radio' },
				description: 'Type of admonition (determines icon and default title)'
			},
			center: {
				control: { type: 'boolean' },
				description: 'Center align the content'
			},
			title: {
				control: { type: 'text' },
				description: 'Custom title (overrides default type-based title)'
			}
		}
	});
</script>

<Story name="All Props" args={{ type: 'note', center: false, title: '' }}>
	{#snippet template(args)}
		<Admonition {...args}>
            This is an admonition with interactive controls. Try changing the type, center, and title!
        </Admonition>
	{/snippet}
</Story>

<Story name="Default" args={{}}>
	{#snippet template(args)}
		<Admonition {...args}>Default admonition content</Admonition>
	{/snippet}
</Story>

<Story name="Typen">
	{#snippet template(args)}
		<Admonition type="note">note</Admonition>
		<Admonition type="info">info</Admonition>
		<Admonition type="tip">tip</Admonition>
		<Admonition type="warning">warning</Admonition>
		<Admonition type="danger">danger</Admonition>
		<Admonition type="experimental">experimental</Admonition>
	{/snippet}
</Story>

<Story name="With Custom Title">
	{#snippet template(args)}
		<Admonition type="note" title="Custom Title">Custom title example</Admonition>
	{/snippet}
</Story>

<Story name="Centered Content">
	{#snippet template(args)}
		<Admonition type="tip" center={true}>This content is centered</Admonition>
	{/snippet}
</Story>
