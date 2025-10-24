<script context="module">
    import { defineMeta } from '@storybook/addon-svelte-csf';

	import Yes from '../../lib/components/elements/Yes.svelte';
	import No from '../../lib/components/elements/No.svelte';

	const { Story } = defineMeta({
		title: 'Elements/Yes & No'
	});
</script>

<Story name="Yes & No">
	{#snippet template(args)}
		<Yes>Lorem Ipsum</Yes>
		<No>Lorem Ipsum</No>
	{/snippet}
</Story>

<Story name="Text">
	{#snippet template(args)}
		<Yes>
			<div class="prose">
				<p>Lorem ipsum</p>
				<p>ILorem ipsum</p>
				<p>Lorem ipsum</p>
				<p>ILorem ipsum</p>
			</div>
		</Yes>
		<No>
			<div class="prose">
				<p>Lorem ipsum</p>
				<p>ILorem ipsum</p>
				<p>Lorem ipsum</p>
				<p>ILorem ipsum</p>
			</div>
		</No>
		<Yes>
			<div class="prose">
				<p>Lorem ipsum</p>
				<p>ILorem ipsum</p>
				<p>Lorem ipsum</p>
				<p>ILorem ipsum</p>
			</div>
		</Yes>
	{/snippet}
</Story>

<Story name="Yes">
	{#snippet template(args)}
		<Yes>Lorem Ipsum</Yes>
	{/snippet}
</Story>

<Story name="No">
	{#snippet template(args)}
		<No>Lorem Ipsum</No>
	{/snippet}
</Story>