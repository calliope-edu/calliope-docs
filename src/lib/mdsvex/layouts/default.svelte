<script context="module">
    import img from '$lib/mdsvex/img.svelte';
	import table from '$lib/mdsvex/table.svelte';
	import a from '$lib/mdsvex/a.svelte';
	import code from '$lib/mdsvex/code.svelte';
	import video from '$lib/mdsvex/video.svelte';
    export { img, table, a, code, video };
</script>

<script>
    // import { onMount } from 'svelte';
	// import { browser } from '$app/environment';

	// onMount(() => {
	// 	if (browser) {
	// 		document.lazyloadInstance.update();
	// 	}
	// });
</script>

<slot />