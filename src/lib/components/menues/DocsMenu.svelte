<script>
  import { getCategories, getSubpages } from '$lib/../sitemap.js';
  import DocsMenuItem from './DocsMenuItem.svelte';
  import { getLocale } from "$lib/paraglide/runtime"
  
  export let menu = 'tech';
  export let active = '';

  
  export let prev = null;
  export let next = null;

  // export let currKategorie = null;
  // export let items = null;

  
  // Get docs categories for current language
  $: categories = getCategories(menu, getLocale());
  
  // Convert to flat list for navigation
  $: allPagesFlat = categories.flatMap(cat => {
    const categoryPath = cat.slug;
    return getSubpages(categoryPath, getLocale());
  });
  
  $: currentIndex = allPagesFlat.findIndex(x => (x.slug+'/' === active || x.slug === active));
  $: prev = (allPagesFlat.length > 0) ? allPagesFlat[currentIndex-1] : null;
  // $: currKategorie = allPagesFlat[currentIndex] ?? null;
  $: next = (currentIndex < allPagesFlat.length) ? allPagesFlat[currentIndex+1] : null;
</script>

<div class="docs-menu">
  {#each categories as item}
    <DocsMenuItem {item} {active} />
  {/each}
</div>

<style lang="scss">
  .docs-menu {
    max-height: 100%;
    overflow-y: auto;
    width: 100%;
    
  }
</style>