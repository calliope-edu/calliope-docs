<script>
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import PageFooter from '$lib/components/layout/PageFooter.svelte';

	import lazyload from 'vanilla-lazyload';
  import { browser } from '$app/environment';


  if (browser && !document.lazyloadInstance) {
    document.lazyloadInstance = new lazyload();
  }

  import "../scss/app.scss";
	
  
</script>

<div class="page">

  
  <PageHeader />
 

  <div class="page-content">
    <slot />
  </div>

  <div>
    <PageFooter />
  </div>
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