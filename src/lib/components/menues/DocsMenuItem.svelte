<script>
    export let item;
    export let active;
</script>

    <div class="item">
        <a class="header" href="/{item.slug}/" on:click={()=>{active = '/'+item.slug;}} class:active={active === '/'+item.slug || active === '/'+item.slug+'/'}>{item.title}</a>
        <div class="menu">
            {#each item.subpages as page, i}
                <a data-sveltekit-prefetch href="/{page.slug}/" class="item" class:active={active.startsWith('/'+page.slug)} on:click={()=>{active = '/'+page.slug;}}>
                    {page.title}
                </a>
            {/each}
        </div>
    </div>
  

<!-- <li 
                            class="mt-12 lg:mt-8">
    <a data-sveltekit-prefetch href="/{item.slug}/" on:click={()=>{active = '/'+item.slug;}}
        class="mb-8 lg:mb-3 font-semibold text-slate-900 block">
        <b>{item.title}</b>
    </a>
    <ul class="space-y-6 lg:space-y-2 border-l border-slate-200">
        {#each item.subpages as page, i}
            <li class:active={active.startsWith('/'+page.slug)}>
                    <a data-sveltekit-prefetch href="/{page.slug}/" on:click={()=>{active = '/'+page.slug;}}
                        class="item block border-l pl-4 -ml-px border-transparent hover:border-slate-400 text-slate-700 hover:text-slate-900">
                        {page.title}
                    </a>
            </li>
        {/each}
    </ul>
</li> -->

<style lang="scss">
    .header {
        color: inherit;
    }
    .item.active {
        color: var(--color-calliope) !important;
    }

    .menu {
      margin: 0 !important;
      margin-top: 1rem !important;
    }

    .menu .item {
        border-radius: 0;
        border-left: 1px solid #eee;
        &.active {
            border-radius: 0;
            border-left: 1px solid var(--color-calliope);
        }
    }
  
</style>

