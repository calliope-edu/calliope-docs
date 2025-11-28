<script>
    import * as m from "$lib/paraglide/messages.js"
    import DocsMenu from '$lib/components/menues/DocsMenu.svelte';
    import Toc from '$lib/components/menues/Toc.svelte';
    import Sticky from "$lib/components/Sticky.svelte";
    import { page } from '$app/state';
    // import { getLocale } from "$lib/paraglide/runtime"

    export let items = null;
    export let meta;

    $: menu = meta.docMenu ?? 'tech';
    $: docTitle = meta.docTitle ?? '';
    $: title = meta.title ?? '';

    let headingSelector = 'main :where(h2, h3):not(.toc-exclude)';
    let breakpoint = 1280;
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

<div class="page-content">
    <div class="docs-menu-container">
        <Sticky top={100}>
            <aside on:click={()=>{menuVisible=false;}} class="docs-menu" class:visible={menuVisible}>
                <!-- {#key getLocale()} -->
                    <DocsMenu {menu} bind:items={items} bind:prev={prev} bind:next={next} active={(page?.params?.slugs??'')} />
                <!-- {/key} -->
            </aside>
        </Sticky>
        <div class="toggle-mobile-menu">
        <button on:click={()=>{menuVisible=!menuVisible;}} class="toggle-button">Menü</button>
        </div>
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
                    <slot></slot>
                    </main>

                    <hr class="separator" />

                    <div class="next-prev-menu">
                        <div>
                            {#if prev}
                                <a data-sveltekit-prefetch class="nav-card prev-card" href="/{prev?.slug}/">
                                    <div class="nav-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
                                            <path d="M0 0h24v24H0V0z" fill="none"/>
                                            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <div class="nav-content">
                                        <div class="nav-label">Vorherige Seite</div>
                                        <div class="nav-title">{prev.title}</div>
                                    </div>
                                </a>
                            {/if}
                        </div>
                    
                        <div>
                            {#if next}
                                <a data-sveltekit-prefetch class="nav-card next-card" href="/{next?.slug}/">
                                    <div class="nav-content">
                                        <div class="nav-label">Nächste Seite</div>
                                        <div class="nav-title">{next.title}</div>
                                    </div>
                                    <div class="nav-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
                                            <path d="M0 0h24v24H0V0z" fill="none"/>
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                </a>
                            {/if}
                        </div>
                    </div>

                    <a href="https://github.com/calliope-edu/calliope-docs/edit/PRODUCTION{(meta.filepath.startsWith('/')) ? '' : '/'}{meta.filepath.split('/').map(encodeURIComponent).join('/')}" target="_blank" class="edit-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v3q-.575.125-1.075.4t-.925.7l-6 5.975V22zm8 0v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95zM13 9h5l-5-5l5 5l-5-5z"/></svg>
                        Auf Github Bearbeiten
                    </a>
                    
                </div>

                <div class="toc-menu-container">
                    <Sticky top={100}>
                        <Toc title="Auf dieser Seite" {headingSelector} {breakpoint} {hide} activeTopOffset={300}
                            bind:headings={headings} 
                            bind:desktop={desktop}
                        />
                    </Sticky>
                </div>

                </div>

        </div>

    </article>
    

</div>

<style lang="scss">
    .page-content {
        display: flex;
        padding: 1.5rem;
        margin: 0 auto;
        max-width: 1440px;

        @media (min-width: 768px) { 
            padding: 2rem; 
        }
        @media (min-width: 1024px) { 
            display: flex; 
        }
    }

    .docs-menu-container {
        width: 0.25rem; 
        z-index:99;
        @media (min-width: 1024px) { 
            width: 16rem; 
        }
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
            width: 16rem; 
            height: auto; 
        }
    }

    .toggle-mobile-menu {
        display: none !important;
        background-color: var(--color-grau, #333); 
        color: white;
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        width: min-content;
        border: 1px solid white;
        width: 45% !important;
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        padding: 0.5rem;
        width: 50%;

        .toggle-button {
            display: block;
            width: 100%;
            margin-left: auto;
            padding: 1rem;
            background-color: var(--primary, #333); 
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 0.875rem;
            cursor: pointer;
            transition: transform 0.2s ease;
            text-align: center;
            
            &:hover {
                transform: translateY(-2px);
            }
        }

        @media (max-width: 1024px) { 
            display: block !important;
        }
    }

    .docTitle {
        font-size: 1.25rem;
        line-height: 1.75rem; 
        font-weight: 600;
        display: block;
    }

    .separator {
        margin-top: 5rem;
    }

    .next-prev-menu {
        display: flex;
        padding: 2.5rem 0; 
        justify-content: space-between;
        gap: 2.5rem;

        > div {
            flex: 1;
        }

        .nav-card {
            display: flex;
            align-items: center;
            padding: 1rem 1.25rem;
            background-color: white;
            border-radius: 6px;
            border: 1px solid #eaecef;
            text-decoration: none;
            color: inherit;
            // width: 100%;
            gap: 1rem;

            &:hover {
                border-color: var(--primary, #3b82f6);
                background-color: rgba(59, 130, 246, 0.02);
            }
            
            &:focus {
                outline: 2px solid var(--primary, #3b82f6);
                outline-offset: 2px;
            }
        }

        .nav-content {
            flex: 1;
        }

        .nav-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary, #3b82f6);
            width: 36px;
            height: 36px;
            flex-shrink: 0;
            border-radius: 4px;
            background-color: rgba(59, 130, 246, 0.08);
        }

        .nav-label {
            font-size: 0.85rem;
            color: #64748b;
            margin-bottom: 0.35rem;
            font-weight: 500;
        }

        .nav-title {
            font-weight: 600;
            color: var(--headerColor, #1a202c);
            line-height: 1.4;
        }

        .prev-card {
            .nav-icon {
                order: -1;
            }
        }

        .next-card {
            text-align: right;
            
            .nav-content {
                text-align: right;
            }
        }

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 1rem;
            padding: 2rem 0;
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
        z-index: 99;
        display: block;
        position: fixed;

        @media (min-width: 1280px) { 
            position: relative;
            display: block; 
            width: 16rem; 
            font-size: 0.875rem;
            line-height: 1.25rem; 
        }

        :global(.sticky) {
                width: 16rem;
                max-width: 100%;
        }

    }

    div :global(.toc-clicked) {
        color: cornflowerblue;
    }

    div :global(h1) {
        margin-bottom: 2em;
    }

    /* nicer, compact style for the edit link + smaller icon */
    .edit-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        border: 1px solid transparent;
        text-decoration: none;
        color: #374151; /* neutral text */
        background-color: rgba(0,0,0,0.02);
        font-weight: 500;
        transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        margin-top: 0.5rem;
    }

    .edit-link svg { width: 18px; height: 18px; display: block; flex-shrink: 0; }

    .edit-link:hover {
        background-color: rgba(59, 130, 246, 0.06);
        color: var(--primary, #3b82f6);
        border-color: rgba(59, 130, 246, 0.12);
    }
</style>