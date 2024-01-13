
<script>
    import DocsMenu from '$lib/components/menues/DocsMenu.svelte';
    import Toc from '$lib/components/menues/Toc.svelte'

    export let currKategorie = null;
    export let items = null;
    export let meta;

    $: menu = meta.docMenu ?? 'docs';
    $: title = meta.docTitle ?? '';

    let headingSelector = '.content :where(h2, h3):not(.toc-exclude)';
    let breakpoint = 1200;
    let headings = [];
    let desktop = false;
    $: hide = (headings.length < 2);
    // $: gridColumns = (!desktop) ? '' : ' 200px';
    // $: gridMaxWidth = (!desktop) ? 1 : 2;
    // style='grid-template-columns: 200px 1fr {gridColumns}; max-width: calc(75ch + {gridMaxWidth} * (200px + 20px))'

    let prev = null;
    let next = null;
</script>

<div class="lg:flex
            max-w-8xl 
            mx-auto 
            px-4 sm:px-6 md:px-8
            pt-16
">

    <aside class="fixed inset-0 z-20 flex-none  h-full hidden w-1 lg:w-52 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-48 lg:block">
        <DocsMenu {menu} bind:items={items} bind:prev={prev} bind:next={next} bind:currKategorie={currKategorie} />
    </aside>
    <div class="fixed inset-0 z-10 hidden bg-gray-900/50"></div>

    <div class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
        <div class=" flex w-full">
            <div class="flex w-full">

                <div class="flex-auto max-w-4xl min-w-0 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16">
                    <div class="content prose max-w-full">
                        {#if title && title.length > 0}
                            <h1 class="font-semibold text-slate-900 text-xl">{title}</h1>
                        {/if}
                        <slot />
                    </div>

                    <hr class="mt-20" />

                    <div class="flex items-center pt-12 pb-20 font-semibold">
                        {#if  prev != null}
                            <a data-sveltekit-prefetch href="/{prev.slug}/" class="group no-underline mb-4 flex flex-col items-start ">
                                    <span class="text-calliope-500 ml-2 mb-1 inline-block font-semibold ">
                                        Vorherige
                                    </span>
                                    <div clas="transform-gpu transition-transform hover:scale-105">
                                        <span class="opacity-0 transition-opacity duration-100 group-hover:visible group-hover:opacity-100">
                                            ←
                                        </span> 
                                        <span class="inline-block transform transition-transform duration-100 group-hover:translate-x-0 -translate-x-3">
                                            {prev.title}
                                        </span>
                                    </div>
                            </a>
                        {/if}

                        {#if  next != null}
                            <a data-sveltekit-prefetch href="/{next.slug}/" class="group no-underline ml-auto mb-4 flex flex-col items-end">
                                    <span class="text-calliope-500 mr-2 mb-1 inline-block font-semibold ">
                                        Nächste
                                    </span>
                                    <div
                                    clas="transform-gpu transition-transform hover:scale-105">
                                        
                                        <span class="inline-block transform transition-transform duration-100 group-hover:translate-x-0 translate-x-2">
                                            {next.title}
                                        </span>
                                        <span class="opacity-0 transition-opacity duration-100 group-hover:visible group-hover:opacity-100">
                                            →
                                        </span> 
                                    </div>
                            </a>
                        {/if}
                    </div>
                </div>

                <div class="flex-none w-1 xl:w-52 pl-8 mr-8 xl:text-sm xl:block">
                    <div class="flex overflow-y-auto sticky top-16 flex-col justify-between pt-10 pb-6 h-[calc(100vh-4rem)]">
                        <Toc title="" {headingSelector} {breakpoint} {hide} activeTopOffset={300}
                            bind:headings={headings} 
                            bind:desktop={desktop}
                        />
                    </div>
                </div>

                </div>


        </div>

    </div>
    


</div>

<style>

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