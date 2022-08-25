
<script>
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

    function getPrevNext(slug, arr){
        
        console.log(currIndex)
    }

    async function getMenuItems(){
    let menuItems = await fetch(`/docs.json`).then((res) => res.json());

    for (var item of menuItems) {
        const url = `/${item.slug}.json`;
        const kategorieItems = await fetch(url).then((res) => res.json());
        item.subpages = kategorieItems;
        allPagesFlat = [...allPagesFlat, ...item.subpages]
    }
    allPages = menuItems;

    return menuItems
    }

    const menuItems = getMenuItems();    

</script>

<nav>

	<div class='menu'>
		<ol>

            <div>
                {#await menuItems}
                    <p>Loading...</p>
                {:then items}
                    {#each items as item}
                        <li class:active={active === '/'+item.slug || active === '/'+item.slug+'/'}>
                            <a sveltekit:prefetch href="/{item.slug}/" on:click={()=>{active = '/'+item.slug;}}>
                                <b>{item.title}</b>
                            </a>
                            <ol>
                                {#each item.subpages as page}
                                    <li class:active={active.startsWith('/'+page.slug)}>
                                            <a sveltekit:prefetch href="/{page.slug}/" on:click={()=>{active = '/'+page.slug;}}>
                                                {page.title}
                                            </a>
                                    </li>
                                {/each}
                            </ol>
                        </li>
                    {/each}
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
                </div>

		</ol>
	</div>

</nav>




<style type='scss'>
   
   .menu ol {
    // display: flex;
    list-style-type: none;
    // margin: 30px -10px;
    padding: 0;
    justify-content: center;
    

    li {
        
        & > a {
            padding: 10px;
            color: var(--color-grey);
            
            
        }

        &.active {
            & > a {
                color: var(--primary);
            }
        }
    }
   }
    
</style>
    