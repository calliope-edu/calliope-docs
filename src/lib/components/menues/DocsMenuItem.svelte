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

<style lang="scss">
    .header {
        color: inherit;
    }
    .item {
        color: rgba(0,0,0,.6) !important;
        &:hover {
            color: rgba(0,0,0,.9) !important;
        }
        &.active {
        // color: var(--color-calliope) !important;
        color: #005F61 !important;
        }
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
            // border-left: 1px solid var(--color-calliope);
            border-left: 1px solid #005F61;
        }
    }
  
</style>

