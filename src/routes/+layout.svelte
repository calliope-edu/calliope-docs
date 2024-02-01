<script>
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageFooter from '$lib/components/layout/PageFooter.svelte';
	import lazyload from 'vanilla-lazyload';
  import { browser } from '$app/environment';
  import { _l, _l_path } from '$lib/scripts/store.js';
  import { page } from '$app/stores';

  $: if(browser) document.documentElement.lang = $_l;

  $: firstSlug = $page.params.slug1;
  $: if(firstSlug == 'en' || firstSlug == 'de') {
    $_l = firstSlug;
    if(browser) document.documentElement.lang = firstSlug;
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

  $: currentPath = `${$page.url.pathname}${$page.url.search}`.replace(/^\/(en|de)\//, '/');

  console.log($page)
  
</script>

<svelte:head>
    <!-- <html lang="{$_l}" /> -->
    <meta http-equiv="content-language" content="{$_l}">
    <link rel="alternate" hreflang="en" href="/en{currentPath}">
    <link rel="alternate" hreflang="de" href="/de{currentPath}">
</svelte:head>

<div>
  {currentPath}
<PageHeader />

<slot />

<PageFooter />
</div>
