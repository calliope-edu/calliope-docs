<script>
	import Icon from '~icons/ri/*';

	export let iconContent = '';
	export let inverse = false;
	export let color = '';
	export let size = 'sm';

	$: isNumber = /^\d+$/.test(iconContent);
</script>

<div class="p-3 icon {inverse ? `text-white bg-${color} rounded-${size}` : `text-${color}`}">
	{#if isNumber}
		{iconContent}
	{:else}
		<Icon /> <!-- get Icon URL -->
	{/if}
</div>

<style>
</style>
