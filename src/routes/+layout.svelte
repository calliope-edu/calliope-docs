<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';
	import { page } from '$app/stores';
	import lazyload from 'vanilla-lazyload';
  	import { browser } from '$app/env';

  if (browser && !document.lazyloadInstance) {
    document.lazyloadInstance = new lazyload();
  }
  
</script>

<PageHeader />

<slot />

<PageFooter />


<style lang="scss" global>
	
	// Import full Pico source code
	@import "../scss/pico.scss";
	@import '../app.scss';

	:global(main) {
		margin: 0 auto;
		width: 100%;
		max-width: 90ch;
	}

</style>
