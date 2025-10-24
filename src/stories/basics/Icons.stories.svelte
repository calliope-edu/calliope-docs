<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SvelteLogo from '~icons/logos/svelte-icon';

	const { Story } = defineMeta({
		title: 'Basics/Icons'
	});
</script>

<Story name="Icons">
	{#snippet template(args)}
		<SvelteLogo />

		<br />

		<SvelteLogo width="64" height="64" />

		<br />

		<div class="prose">
			<p>Icons müssen vor verwendung per JS-Import geladen werden.</p>
			<pre>import SvelteLogo from '~icons/logos/svelte-icon'</pre>
			<p>
				Der Import setzt sich zusammen aus '~icons/[BIBLIOTHEK]/ICON NAME]`. Das Icon 'ri:alert-fill' würde also
				mit '~icons/ri/alert-fill' importiert.
			</p>
			<p>
				Alle Icons sind hier gelistet: <a href="https://icones.js.org/collection/all" target="_blank"
					>https://icones.js.org/collection/all</a
				>
			</p>
			<p>Häufige Icons können wir auch ohne Import verfügbar machen. Bisher sind das:</p>
			<ul>
				<li>Keine</li>
			</ul>
		</div>
	{/snippet}
</Story>

<Story name="Normal">
	{#snippet template(args)}
		<SvelteLogo />
	{/snippet}
</Story>

<Story name="Groß">
	{#snippet template(args)}
		<SvelteLogo width="64" height="64" />
	{/snippet}
</Story>