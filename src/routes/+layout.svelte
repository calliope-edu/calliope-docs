<script>
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageFooter from '$lib/components/layout/PageFooter.svelte';
  import LocaleSwitch from '$lib/components/LocaleSwitch.svelte';
	import lazyload from 'vanilla-lazyload';
  import { browser } from '$app/environment';


  if (browser && !document.lazyloadInstance) {
    document.lazyloadInstance = new lazyload();
  }

  import "../scss/app.scss";
	
  
</script>

<LocaleSwitch />

<div>

<PageHeader />

<slot />

<PageFooter />
</div>
