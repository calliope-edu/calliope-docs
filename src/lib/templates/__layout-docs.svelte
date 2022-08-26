
<script>
    import DocsMenu from '$lib/components/menues/DocsMenu.svelte';
    import Toc from '$lib/components/menues/Toc.svelte'

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

<div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-20 min-h-screen">

    <aside class="hidden lg:block fixed z-10 inset-0 top-20 left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
        <DocsMenu bind:prev={prev} bind:next={next} />
    </aside>

    <div class="lg:pl-[19.5rem]">
        <div class="content prose max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
            <slot />

            <hr class="mt-20" />

            <div class="flex items-center pt-12 pb-20 font-semibold">
                {#if  prev != null}
                    <a sveltekit:prefetch href="/{prev.slug}/" class="group no-underline mb-4 flex flex-col items-start ">
                        
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
                <a sveltekit:prefetch href="/{next.slug}/" class="group no-underline ml-auto mb-4 flex flex-col items-end">
                   
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

    </div>
    
    <div class="fixed z-10 top-20 bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
    <Toc title="" {headingSelector} {breakpoint} {hide}
        bind:headings={headings} 
        bind:desktop={desktop}
    />
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


</style>