<script context="module">
    import img from '$lib/mdsvex/img.svelte';
    import output from '$lib/mdsvex/output.svelte';
    export { img, output };
</script>

<script>
    import { onMount } from 'svelte';
	import { browser } from '$app/env';

	onMount(() => {
		if (browser) {
			document.lazyloadInstance.update();
		}
	});
</script>

<slot />