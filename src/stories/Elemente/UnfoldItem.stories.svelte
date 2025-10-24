<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SvelteLogo from '~icons/logos/svelte-icon';
	import IconCheckmark from '~icons/ri/checkbox-circle-line';

	import UnfoldItem from '../../lib/components/elements/UnfoldItem.svelte';

	const { Story } = defineMeta({
		title: 'Elements/Unfold Item',
		component: UnfoldItem,
		argTypes: {
			h: { control: 'number', description: 'Height of UnfoldItem in `rem`' }
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<UnfoldItem title="Lorem Ipsum">Dolor sit amed</UnfoldItem>

		<UnfoldItem title="Lorem Ipsum">Dolor sit amed</UnfoldItem>

		<UnfoldItem title="Lorem Ipsum">Dolor sit amed</UnfoldItem>
	{/snippet}
</Story>

<Story name="Farben">
	{#snippet template(args)}
		<UnfoldItem title="Calliope" color="calliope">Calliope</UnfoldItem>
		<UnfoldItem title="Rosa" color="rosa">Rosa</UnfoldItem>
		<UnfoldItem title="Blau" color="blau">Blau</UnfoldItem>
		<UnfoldItem title="Gruen" color="gruen">Gruen</UnfoldItem>
		<UnfoldItem title="Lila" color="lila">Lila</UnfoldItem>
		<UnfoldItem title="Gelb" color="gelb">Gelb</UnfoldItem>
		<UnfoldItem title="Apricot" color="apricot">Apricot</UnfoldItem>
		<UnfoldItem title="Grau" color="grau">Grau</UnfoldItem>
		<UnfoldItem title="Calliope" color="calliope">Calliope</UnfoldItem>
	{/snippet}
</Story>

<Story name="Gruppen">
	{#snippet template(args)}
		<div class="prose">
			<h2>Gruppe A</h2>
			<UnfoldItem title="Lorem Ipsum" group="A" active>Dolor sit amed</UnfoldItem>
			<UnfoldItem title="Lorem Ipsum" group="A">Dolor sit amed</UnfoldItem>
			<UnfoldItem title="Lorem Ipsum" group="A">Dolor sit amed</UnfoldItem>
		</div>

		<div class="prose">
			<h2>Gruppe B (noclose)</h2>
			<UnfoldItem title="Lorem Ipsum" group="B" noclose active>Dolor sit amed</UnfoldItem>
			<UnfoldItem title="Lorem Ipsum" group="B" noclose>Dolor sit amed</UnfoldItem>
			<UnfoldItem title="Lorem Ipsum" group="B" noclose>Dolor sit amed</UnfoldItem>
		</div>

		<div class="prose">
			<h2>Noch mal Gruppe A</h2>
			<UnfoldItem title="Lorem Ipsum" group="A">Dolor sit amed</UnfoldItem>
			<UnfoldItem title="Lorem Ipsum" group="A">Dolor sit amed</UnfoldItem>
			<UnfoldItem title="Lorem Ipsum" group="A">Dolor sit amed</UnfoldItem>
		</div>
	{/snippet}
</Story>

<Story name="Before- und Title-Slot">
	{#snippet template(args)}
		<div class="prose">
			<UnfoldItem>
				<IconCheckmark width="64px" height="32px" slot="before" />
				<div slot="title" class="text-xl">Lorem Ipsum</div>
				Dolor sit amed
			</UnfoldItem>

			<UnfoldItem>
				<IconCheckmark width="64px" height="32px" slot="before" />
				<div slot="title" class="text-xl">Lorem Ipsum</div>
				Dolor sit amed
			</UnfoldItem>

			<UnfoldItem>
				<IconCheckmark width="64px" height="32px" slot="before" />
				<div slot="title" class="text-xl">Lorem Ipsum</div>
				Dolor sit amed
			</UnfoldItem>
		</div>
	{/snippet}
</Story>

<Story name="Mehrzeilige Überschrift">
	{#snippet template(args)}
		<UnfoldItem title="Lorem Ipsum">
			<div slot="before">
				<SvelteLogo width="64px" height="32px" />
			</div>
			<div slot="title">
				Lorem Ipsum<br />
				Dolor Sit<br />
				Lorem Ipsum Dolor
			</div>
			Dolor sit amed
		</UnfoldItem>
	{/snippet}
</Story>

