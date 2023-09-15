<script context="module">
    import img from '$lib/mdsvex/img.svelte';
	import table from '$lib/mdsvex/table.svelte';
	import a from '$lib/mdsvex/a.svelte';
    export { img, table, a };
</script>

<script>
    import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	onMount(() => {
		if (browser) {
			document.lazyloadInstance.update();
		}
	});
</script>

<slot />