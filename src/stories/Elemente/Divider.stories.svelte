<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
		import SvelteLogo from '~icons/logos/svelte-icon';

	import Divider from '../../lib/components/elements/Divider.svelte';

	const { Story } = defineMeta({
		title: 'Elements/Divider',
		component: Divider,
		argTypes: {
			color: {
				options: ['calliope', 'rosa', 'blau', 'gruen', 'lila', 'gelb', 'apricot', 'grau', 'regenbogen'],
				control: { type: 'inline-radio' },
				description: 'Color of the divider'
			},
			align: {
				options: ['left', 'center', 'right'],
				control: { type: 'inline-radio' },
				description: 'Text alignment (default: center)'
			}
		}
	});
</script>

<Story name="All Props" args={{ color: 'grau', align: 'center' }}>
	{#snippet template(args)}
		<Divider {...args}>Divider Content</Divider>
	{/snippet}
</Story>

<Story name="Default" args={{ color: 'grau' }}>
	{#snippet template(args)}
		<Divider {...args}>Default Divider</Divider>
	{/snippet}
</Story>

<Story name="Inhalt">
	{#snippet template(args)}
		<Divider>Text Content</Divider>
		<Divider><SvelteLogo /></Divider>
	{/snippet}
</Story>

<Story name="Alignment">
	{#snippet template(args)}
		<Divider align="left">Left Aligned</Divider>
		<Divider align="center">Center Aligned</Divider>
		<Divider align="right">Right Aligned</Divider>
	{/snippet}
</Story>

<Story name="Farben">
	{#snippet template(args)}
		<Divider color="calliope">1</Divider>
		<Divider color="rosa">2</Divider>
		<Divider color="blau">3</Divider>
		<Divider color="gruen">4</Divider>
		<Divider color="lila">5</Divider>
		<Divider color="gelb">6</Divider>
		<Divider color="apricot">7</Divider>
		<Divider color="grau">8</Divider>
		<Divider color="regenbogen">9</Divider>
	{/snippet}
</Story>
