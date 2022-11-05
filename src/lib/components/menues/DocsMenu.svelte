
<script>
  import DocsMenuItem from './DocsMenuItem.svelte';

	import { page } from '$app/stores'

    export let prev = null;
    export let next = null;
    export let currKategorie = null;

    let allPagesFlat = [];
    let allPages = [];

	$: active = $page.url.pathname;
    $: currentIndex = allPagesFlat.findIndex(x => ('/'+x.slug+'/' === active || '/'+x.slug === active));
    $: currKategorie = allPages?.find(x => ( (active).startsWith('/'+x?.slug) ));
    

    $: prev = (allPagesFlat.length > 0) ? allPagesFlat[currentIndex-1] : null;
    $: curr = allPagesFlat[currentIndex] ?? null;
    $: next = (currentIndex < allPagesFlat.length) ? allPagesFlat[currentIndex+1] : null;

    // function getPrevNext(slug, arr){
        // console.log(currIndex)
    // }

    async function getMenuItems(){
    let menuItems = await fetch(`/docs.json`).then((res) => res.json());

    for (var item of menuItems) {
        const url = `/${item.slug}.json`;
        const kategorieItems = await fetch(url).then((res) => res.json());
        item.subpages = kategorieItems;
        allPagesFlat = [...allPagesFlat, ...item.subpages]
    }
    allPages = menuItems;
    // console.log(menuItems)
    return menuItems
    }
    
    const menuItems = getMenuItems();    


import { slugFromPath } from '$lib/util';


// Dummy menu for SSR
const modules = {
    ...import.meta.glob(`../../../content/docs/{[!index]*,*/index}{.,.de.,.en.}page`),
    ...import.meta.glob(`../../../content/docs/*/{[!index]*,*/index}{.,.de.,.en.}page`)
}
let posts = {};

for (let [path] of Object.entries(modules)) {
    const slug = slugFromPath(path);
    const slugArr = slug.split("/")
    const depth = slugArr.length - 1
    const title = slugArr[depth]
    let pageMeta = ({
            slug,
            depth,
            title: title.charAt(0).toUpperCase() + title.slice(1),
            subpages: []
        })
    if(depth == 1) {
        posts[title] = pageMeta;
    } else if (depth == 2) {
        const kategorie = slugArr[depth-1]
        if(kategorie != undefined) {
            posts[kategorie].subpages.push(pageMeta);
        }
    }
}


</script>

<div class="overflow-y-auto z-20 h-full scrolling-touch max-w-2xs lg:h-[calc(100vh-4rem)] pb-6 lg:block lg:sticky top:16 lg:top-16 lg:mr-0">
    <nav class="lg:text-sm lg:leading-6 relative">
        <div class='menu'>
            <ul>

                <div>
                    {#await menuItems}
                    {#each Object.values(posts) as item}
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

            </ul>
        </div>

    </nav>
</div>

<style>

</style>