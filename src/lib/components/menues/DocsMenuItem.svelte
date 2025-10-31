<script>
    import { languagesMeta } from '$lib/scripts/store.js';
    import { getLocale } from "$lib/paraglide/runtime"
    
    export let item;
    export let active;

    let regex = new RegExp(`^/?(${languagesMeta[getLocale()].path})?${item.slug}(/.*)?$`);
    $: isActive = regex.test(active);
</script>

<div class="item category-item" class:has-active-children={isActive}>
    <a class="header" 
       href="/{item.slug}/" 
       on:click={() => { active = '/'+item.slug; }} 
       class:active={isActive}
       aria-current={isActive ? 'page' : undefined}>
        {item.title}
    </a>
    {#if item.subpages && item.subpages.length > 0}
        <div class="menu">
            {#each item.subpages as page}
                {@const regexSub = new RegExp(`^/?(${languagesMeta[getLocale()].path})?${page.slug}(/.*)?$`)}
                {@const isSubActive = regexSub.test(active)}
                <a data-sveltekit-prefetch 
                   href="/{page.slug}/" 
                   class="item subpage-link" 
                   class:active={isSubActive} 
                   aria-current={isSubActive ? 'page' : undefined}
                   on:click={() => { active = '/'+page.slug; }}>
                    {page.title}
                </a>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    a {
        text-decoration: none;
        color: var(--bodyTextColor);
        
        &:focus-visible {
            outline: 1px solid var(--primary);
            outline-offset: 2px;
        }
    }
    .category-item {
        margin-bottom: 1rem;
        
        &.has-active-children {
            // Highlight the parent category when a child is active
            background-color: rgba(255, 106, 62, 0.05);
        }
    }

    .header {
        display: block;
        color: var(--bodyTextColor);
        padding: 0.6rem 0;
        font-weight: 700;
        font-size: 1em;
        
        &.active {
            color: var(--primary) !important;
            font-weight: 600;
        }
        
        @media (max-width: 1024px) {
            padding: 0.8rem 0;
            font-size: 1.05em;
        }
    }
    
    .item {
        color: var(--bodyTextColor) !important;
        border-radius: 0 !important;
        font-size: 0.95em;
        
        &:hover {
            color: var(--headerColor) !important;
            background-color: rgba(255, 106, 62, 0.03);
        }
        
        &.active {
            color: var(--primary) !important;
        }
    }

    .menu {
        margin: 0 !important;
        margin-top: 0.5rem !important;
        margin-bottom: 0.75rem !important;
    }

    .menu .item {
        display: block;
        border-radius: 0;
        border-left: 1px solid #eee;
        padding: 0.5rem 0 0.5rem 1rem;
        margin-left: 0.25rem;
        line-height: 1.3;
        transition: border-color 0.2s ease, background-color 0.2s ease;
        
        @media (max-width: 1024px) {
            padding: 0.7rem 0 0.7rem 1rem;
            margin-left: 0.5rem;
        }
        
        &.active {
            border-radius: 0;
            border-left: 2px solid var(--primary);
            font-weight: 500;
            padding-left: calc(1rem - 1px); /* Adjust for thicker border */
        }
    }
    
    .subpage-link {
        text-decoration: none;
        
        &:focus-visible {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
    }
</style>