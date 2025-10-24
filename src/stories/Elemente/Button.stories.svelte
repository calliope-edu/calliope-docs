<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
		import Button from '../../lib/components/elements/Button.svelte';

	const { Story } = defineMeta({
		title: 'Elements/Button',
		component: Button,
		parameters: {
			viewMode: 'docs'
		},
		argTypes: {
			download: { control: { type: 'text' }, description: 'Definiert einen Namen für den Download.' },
			type: { options: ['default', 'border'], control: { type: 'radio' } },
			color: {
				options: ['calliope', 'rosa', 'blau', 'gruen', 'lila', 'gelb', 'apricot', 'grau', 'regenbogen'],
				control: { type: 'inline-radio' }
			},
			rounded: {
				options: ['full', 'none', 'l-full', 'r-full', 'rounded'],
				control: { type: 'inline-radio' }
			},
			text: { control: { type: 'text' }, description: 'Text im Button, optional' }
		}
	});
</script>

<Story
	name="All Props"
	args={{
		type: 'default',
		link: '//google.de/sample.hex',
		download: 'Beispiel.hex',
		color: 'grau',
		rounded: 'full',
		text: 'Text'
	}}
>
	{#snippet template(args)}
			<Button {...args} />
	{/snippet}
</Story>

<Story name="Default">
	{#snippet template(args)}
		<Button>Text</Button>
	{/snippet}
</Story>

<Story name="Farben">
	{#snippet template(args)}
		<Button color="calliope">Calliope</Button>

		<Button color="rosa">Rosa</Button>

		<Button color="blau">Blau</Button>

		<Button color="gruen">Gruen</Button>

		<Button color="lila">Lila</Button>

		<Button color="gelb">Gelb</Button>

		<Button color="apricot">Apricot</Button>

		<Button color="grau">Grau</Button>

		<Button color="regenbogen">Regenbogen</Button>
	{/snippet}
</Story>

<Story name="Rahmen">
	{#snippet template(args)}
		<Button type="border" color="calliope">Calliope</Button>

		<Button type="border" color="rosa">Rosa</Button>

		<Button type="border" color="blau">Blau</Button>

		<Button type="border" color="gruen">Gruen</Button>

		<Button type="border" color="lila">Lila</Button>

		<Button type="border" color="gelb">Gelb</Button>

		<Button type="border" color="apricot">Apricot</Button>

		<Button type="border" color="grau">Grau</Button>

		<Button type="border" color="regenbogen">Regenbogen</Button>
	{/snippet}
</Story>

<Story name="Rundung">
	{#snippet template(args)}
		<Button rounded="l-full">Links Full</Button>
		<Button rounded="none">None</Button>
		<Button rounded="r-full">Rechts Full</Button>
		<Button rounded="full">Full</Button>
		<Button rounded="">Empty String</Button>
		<Button>Default (no rounded prop)</Button>
	{/snippet}
</Story>

<Story name="Link Arten">
	{#snippet template(args)}
		<Button link="./">Interner Link</Button>

		<Button link="#Button">Seiteninterner Link</Button>

		<Button link="//google.de">Externer Link</Button>

		<Button link="./sample.hex">Download Link</Button>

		<Button link="./sample.hex" download="Beispiel.hex">Download Namen Setzen</Button>

		<Button link="//google.de/sample.hex">Externer Download Link</Button>

		<Button link="//google.de/sample.hex" color="regenbogen">Externer Download Link Regenbogen</Button>

		<Button link="//google.de/sample.hex" color="regenbogen" type="border"
			>Externer Download Link Border Regenbogen</Button
		>
	{/snippet}
</Story>

<Story name="Buttoninhalt definieren">
	{#snippet template(args)}
		<Button>Slot</Button>

		<Button text="Prop"></Button>

		<Button link="//google.de" rounded="" color="regenbogen">
			<img src="https://calliope.cc/assets/images/calliope_logo.png" alt="" />
		</Button>
	{/snippet}
</Story>