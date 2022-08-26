
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

<nav class="lg:text-sm lg:leading-6 relative">

	<div class='menu'>
		<ul>

            <div>
                {#await menuItems}
                    <p>Loading...</p>
                {:then items}
                    {#each items as item}
                        <li class:active={active === '/'+item.slug || active === '/'+item.slug+'/'}
                        class="mt-12 lg:mt-8">
                            <a sveltekit:prefetch href="/{item.slug}/" on:click={()=>{active = '/'+item.slug;}}
                                class="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">
                                <b>{item.title}</b>
                            </a>
                            <ul class="space-y-6 lg:space-y-2 border-l border-slate-200 dark:border-slate-800">
                                {#each item.subpages as page}
                                    <li class:active={active.startsWith('/'+page.slug)}>
                                            <a sveltekit:prefetch href="/{page.slug}/" on:click={()=>{active = '/'+page.slug;}}
                                                class="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
                                                {page.title}
                                            </a>
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/each}
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
                </div>

		</ul>
	</div>

</nav>

<style>
    .active a {
        @apply block border-l pl-4 -ml-px text-sky-500 border-current font-semibold dark:text-sky-400;
    }
</style>