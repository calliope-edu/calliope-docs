<script>
    import { _lang } from '$lib/scripts/store.js';
    export let item;
    export let active;

    let regex = new RegExp(`^(${$_lang.path})?${item.slug}(/.*)?$`)
</script>

    <div class="item">
        <a class="header" href="{$_lang.path}{item.slug}/" on:click={()=>{active = '/'+item.slug;}} class:active={regex.test(active)}>{item.title}</a>
        <div class="menu">
            {#each item.subpages as page, i}
            {@const regexSub = new RegExp(`^(${$_lang.path})?${page.slug}(/.*)?$`)}
                <a data-sveltekit-prefetch href="{$_lang.path}{page.slug}/" class="item" class:active={regexSub.test(active)} on:click={()=>{active = '/'+page.slug;}}>
                    {page.title}
                </a>
            {/each}
        </div>
    </div>

<style lang="scss">
    .header {
        color: inherit;
        &.active {
            color: #005F61 !important;
        }
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

