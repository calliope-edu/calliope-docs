<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Grid from './../../lib/components/layout/Grid.svelte';
	const { Story } = defineMeta({
		title: 'Basics/Listen'
	});
</script>

<Story name="Listen">
	{#snippet template(args)}
		<Grid>
			<div>
				<h2>Ungeordnete Liste</h2>
				<ul>
					<li>hfgh</li>
					<li>hfgh</li>
					<li>hfgh</li>
				</ul>
			</div>

			<div>
				<h2>Geordnete Liste:</h2>
				<ol>
					<li>hfgh</li>
					<li>hfgh</li>
					<li>hfgh</li>
				</ol>
			</div>
		</Grid>
	{/snippet}
</Story>

<Story name="<ul>">
	{#snippet template(args)}
		<ul>
			<li>hfgh</li>
			<li>hfgh</li>
			<li>hfgh</li>
		</ul>
	{/snippet}
</Story>

<Story name="<ol>">
	{#snippet template(args)}
		<ol>
			<li>hfgh</li>
			<li>hfgh</li>
			<li>hfgh</li>
		</ol>
	{/snippet}
</Story>