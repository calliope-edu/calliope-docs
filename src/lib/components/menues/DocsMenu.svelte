<script>
    import DocsMenuItem from './DocsMenuItem.svelte';
    import { page } from '$app/stores';
    import { slugFromPath } from '$lib/util';
  
    export let prev = null;
    export let next = null;
    export let currKategorie = null;
    export let menu = '/';
    export let items = null;
  
    let allPagesFlat = [];
    let allPages = [];
    let posts = [];
  
    $: active = $page.url.pathname;
    $: currentIndex = allPagesFlat.findIndex(x => ('/'+x.slug+'/' === active || '/'+x.slug === active || active.startsWith('/'+x.slug+'/')));
    $: currKategorie = allPages?.find(x => ( (active).startsWith('/'+x?.slug) ));
  
    $: prev = (allPagesFlat.length > 0) ? allPagesFlat[currentIndex-1] : null;
    $: curr = allPagesFlat[currentIndex] ?? null;
    $: next = (currentIndex < allPagesFlat.length) ? allPagesFlat[currentIndex+1] : null;
  
    async function getMenuItems() {
      let menuItems = await fetch(`/${menu}.json`).then((res) => res.json());
  
      for (var item of menuItems) {
        const url = `/${item.slug}.json`;
        const kategorieItems = await fetch(url).then((res) => res.json());
        item.subpages = kategorieItems;
        allPagesFlat = [...allPagesFlat, ...item.subpages];
      }
      allPages = menuItems;
      items = menuItems;
      return menuItems;
    }
  
    const menuItems = getMenuItems();
  
    // Dummy menu for SSR
    const matches = Object.fromEntries(
      Object.entries(import.meta.glob(`../../../content/{,*/,*/*/,*/*/*/,*/*/*/*/}{[!index]*,*/index}{.,.de.,.en.}page`))
        .sort(([pathA], [pathB]) => pathB.localeCompare(pathA))
        .filter(([path, resolver]) => {
          const filename = slugFromPath(path);
          return filename.startsWith(`${menu}/`);
        })
    );
  
    for (let [path] of Object.entries(matches)) {
      const slug = slugFromPath(path);
      const slugRelative = (menu && menu.length > 0) ? slug.replace(menu, '') : slug;
      const slugArr = slugRelative.split("/");
      const depth = slugArr.length - 1;
      const title = slugArr[depth];
      const kategorie = slugArr[1];
      let pageMeta = ({
        kategorie,
        slug,
        depth,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subpages: []
      });
      if (depth === 1) {
        posts.push(pageMeta);
      } else if (depth === 2) {
        if (kategorie != undefined) {
          const kategorieIndex = posts.findIndex(post => post.kategorie === kategorie);
          if (kategorieIndex !== -1) {
            posts[kategorieIndex].subpages.push(pageMeta);
          }
        }
      }
    }
  
    // Reverse the order of posts
    posts.reverse();
    
    // Reverse the order of subpages within each category
    for (const post of posts) {
      post.subpages.reverse();
    }
  
  </script>

<div class="ui secondary vertical fluid menu">
    {#await menuItems}
      {#each posts as item}
        <DocsMenuItem {item} {active} />
      {/each}
      {:then items}
        {#each items as item}
          <DocsMenuItem {item} {active} />
        {/each}
      {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>


  <style lang="scss">

  </style>
  