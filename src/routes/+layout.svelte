<script>
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageFooter from '$lib/components/layout/PageFooter.svelte';
	import lazyload from 'vanilla-lazyload';
  	import { browser } from '$app/environment';

  if (browser && !document.lazyloadInstance) {
    document.lazyloadInstance = new lazyload();
  }

  import "../app.css";
  
</script>

<div>
<PageHeader />

<slot />

<PageFooter />
</div>


<style lang="scss" global>

	body {
		@apply bg-gray-50 font-sans leading-normal tracking-normal;
	}

	main {
		@apply container w-full md:max-w-3xl mx-auto pt-20;
	}

</style>
