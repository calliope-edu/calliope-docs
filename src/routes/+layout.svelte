<script>
	// import { ParaglideJS } from '@inlang/paraglide-sveltekit'
    import { page } from '$app/state';
    import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';

	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageFooter from '$lib/components/layout/PageFooter.svelte';

  let { children } = $props();

	// import lazyload from 'vanilla-lazyload';
  // import { browser } from '$app/environment';


  // if (browser && !document.lazyloadInstance) {
  //   document.lazyloadInstance = new lazyload();
  // }

  import "../scss/app.scss";
	
</script>
<svelte:head>
  <meta name="docsearch:language_tag" content={getLocale()} />
</svelte:head>


<div class="page">

  
  <PageHeader />
 

  <div class="page-content">
    {#key getLocale()}
      {@render children()}
    {/key}
  </div>

  <div>
    <PageFooter />
  </div>
</div>

<div style="display:none">
 {#each locales as locale}\
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
 {/each}
</div>

<style lang="scss">
  .page {
    min-height: calc(100vh + 1px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .page-content {
      flex-grow: 1;
    }
  }
</style>