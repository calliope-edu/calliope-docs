<script>
    import DocsMenu from '$lib/components/menues/DocsMenu.svelte';
    import Toc from '$lib/components/menues/Toc.svelte';
    import Sticky from "$lib/components/Sticky.svelte";
    import { _lang } from '$lib/scripts/store.js';
    import { selectedBoardVersion } from '$lib/scripts/store.js';
    // import page from '$app/stores/page';

    export let currKategorie = null;
    export let items = null;
    export let meta;

    $: menu = meta.docMenu ?? 'tech';
    $: docTitle = meta.docTitle ?? '';
    $: title = meta.title ?? '';

    let headingSelector = 'main :where(h2, h3):not(.toc-exclude)';
    let breakpoint = 1200;
    let headings = [];
    let desktop = false;
    let menuVisible = false;
    $: hide = (headings.length < 2);
    // $: gridColumns = (!desktop) ? '' : ' 200px';
    // $: gridMaxWidth = (!desktop) ? 1 : 2;
    // style='grid-template-columns: 200px 1fr {gridColumns}; max-width: calc(75ch + {gridMaxWidth} * (200px + 20px))'

    let prev = null;
    let next = null;
</script>

<div class="page-content ui wide container">
    <div style="z-index: 99; position: relative;">
    <Sticky top={100}>
        <aside on:click={()=>{menuVisible=false;}} class="docs-menu ui sticky fixed top" class:visible={menuVisible}>
            {#key $_lang.code}
            <DocsMenu {menu} bind:items={items} bind:prev={prev} bind:next={next} bind:currKategorie={currKategorie} />
            {/key}
        </aside>
    </Sticky>
    <button on:click={()=>{menuVisible=!menuVisible;}} class="toggle-mobile-menu ui button tiny fluid">Menu</button>
</div>
    <article>
        <div class="full-flex">
            <div class="full-flex">

                <div class="docs-center">
                    <main>
                        <h1>
                        {#if docTitle && docTitle.length > 0}
                            <span class="docTitle">{docTitle}</span>
                        {/if}
                        {#if title && title.length > 0}
                            <span>{title}</span>
                        {/if}
                    </h1>
                        <slot />
                    </main>

                    <hr style="margin-top: 5rem;" />

                    <div class="next-prev-menu">

                        <div>
                            {#if  prev != null}
                                <a data-sveltekit-prefetch class="ui horizontal card" href="{$_lang.path}{prev?.slug}">
                                    <div class="content">
                                        <div class="meta">Vorherige Seite</div>
                                        <div class="header">
                                            <span class="category">{prev.title}</span>
                                        </div>
                                        
                                    </div>
                                </a>
                            {/if}
                        </div>

                        <div>
                            {#if  next != null}
                                <a data-sveltekit-prefetch class="ui horizontal card" href="{$_lang.path}{next?.slug}" style="text-align:right;">
                                    <div class="content">
                                        <div class="meta">Nächste Seite</div>
                                        <div class="header">
                                            <span class="category">{next.title}</span>
                                        </div>
                                    </div>
                                </a>
                            {/if}
                        </div>
                    </div>

                    <a href="https://github.com/calliope-edu/calliope-docs/edit/PRODUCTION/{meta.filepath}" target="_blank" class="edit-link">
                        <i class="edit icon" />
                        Diese Seite auf GitHub bearbeiten
                    </a>
                    
                </div>

                <div class="toc-menu-container">
                    <Sticky top={100}>
                        {#key $selectedBoardVersion}
                        <Toc title="Auf dieser Seite" {headingSelector} {breakpoint} {hide} activeTopOffset={300}
                            bind:headings={headings} 
                            bind:desktop={desktop}
                        />
                        {/key}
                    </Sticky>
                </div>

                </div>

        </div>

    </article>
    

</div>

<style lang="scss">

    .docTitle {
        font-size: 1.25rem;
        line-height: 1.75rem; 
        font-weight: 600;
        display: block;
    }

    .edit-link {
        // color: inherit;
        opacity: .7;
    }

    .next-prev-menu {
        display: flex; 
        padding-top: 3rem; 
        padding-bottom: 5rem; 
        align-items: center; 
        font-weight: 600;
        justify-content: space-between;
        gap: 1rem;

        @media (max-width: 720px) {
            flex-direction: column
        }

        .card {
            margin: 0;
            max-width: 100px;
        }
    }

    .toggle-mobile-menu {
        display: none;
        background-color: var(--color-calliope); color: white;
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        width: min-content;
        border: 1px solid white;

        @media (max-width: 1024px) { 
            display: block;
            
        }
    }

.page-content {
    padding-left: 1rem;
    padding-right: 1rem; 
    padding-top: 4rem;
    // min-height: calc(100vh - 221px);

    @media (min-width: 640px) { 
        padding-left: 1.5rem;
        padding-right: 1.5rem; 
    }
    @media (min-width: 768px) { 
        padding-left: 2rem;
        padding-right: 2rem; 
    }
    @media (min-width: 1024px) { 
        display: flex; 
    }

    .docs-menu {
        display: none; 
        position: fixed; 
        top: 0;
        right: 0;
        bottom: 0;
        left: 0; 
        z-index: 99; 
        flex: none; 
        width: 0.25rem; 
        height: 100%;

        &.visible {
            @media (max-width: 1024px) { 
                display: flex;
                align-items: flex-end;
                background: rgba(255,255,255,.8);
                overflow-y: auto; 
                top: auto;
                bottom: 0rem;
                width: 100vw; 
                padding: 1rem;
                padding-bottom:5rem;
                padding-top: 8rem;
                height: 100%;
                -webkit-backdrop-filter: blur(6px);
                backdrop-filter: blur(6px);
            }
        }

        @media (min-width: 1024px) { 
            display: block; 
            overflow-y: visible; 
            position: static; 
            padding-top: 0; 
            width: 13rem; 
            height: auto; 
        }
    }

    article {
        flex: 1 1 auto; 
        width: 100%; 
        min-width: 0; 

        @media (min-width: 1024px) { 
            overflow: visible; 
            position: static; 
            max-height: 100%; 
        }

        .full-flex {
            display: flex; 
            width: 100%; 
        }

        .docs-center {
            padding-top: 1.5rem; 
            flex: 1 1 auto; 
            min-width: 0; 
            max-width: 56rem; 

            @media (min-width: 1024px) { 
                padding-left: 2rem;
                padding-right: 2rem; 
                padding-top: 2rem; 
                padding-bottom: 4rem; 
            }
            @media (min-width: 1280px) { 
                padding-bottom: 6rem; 
            }

        }
    }

    .toc-menu-container {
        // padding-left: 2rem; 
        // margin-right: 2rem; 
        // flex: none; 
        // width: 0.25rem; 

        @media (min-width: 1280px) { 
            display: block; 
            width: 13rem; 
            font-size: 0.875rem;
            line-height: 1.25rem; 
        }

    }


}

/* div {
    
    margin: auto;
    position: relative;
    display: grid;
    column-gap: 40px;
    grid-template-columns: 200px 1fr 200px;
    max-width: calc(75ch + 2 * 200px + 2* 40px);
}

aside {
    position: sticky;
    top: 2em;
    height: max-content;
} */

div :global(.toc-clicked) {
  color: cornflowerblue;
}

div :global(h1) {
        margin-bottom: 2em;
    }
</style>