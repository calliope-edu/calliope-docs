<script>
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageFooter from '$lib/components/layout/PageFooter.svelte';
	import lazyload from 'vanilla-lazyload';
  import { browser } from '$app/environment';
  import { _l, _l_path } from '$lib/scripts/store.js';
  import { page } from '$app/stores';

  $: firstSlug = $page.params.slug1;
  $: if(firstSlug == 'en' || firstSlug == 'de') {
    $_l = firstSlug;
    if(firstSlug == 'de') {
      $_l_path = '';
    } else {
      $_l_path = `${firstSlug}/`
    }
  } else {
    $_l = 'de';
    $_l_path = '';
  }

  if (browser && !document.lazyloadInstance) {
    document.lazyloadInstance = new lazyload();
  }

  import "../scss/app.scss";
  
</script>
{$_l_path} | {firstSlug}

<div>
<PageHeader />

<slot />

<PageFooter />
</div>
