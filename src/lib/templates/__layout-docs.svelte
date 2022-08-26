
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

<div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-20">

    <aside class="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
        <DocsMenu bind:prev={prev} bind:next={next} />
    </aside>

    <div class="lg:pl-[19.5rem]">
        <div class="content prose-base max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
            <slot />

            {#if  prev != null}
                <a sveltekit:prefetch href="/{prev.slug}/">
                    ← {prev.title}
                </a>
            {/if}
            |
            {#if  next != null}
                <a sveltekit:prefetch href="/{next.slug}/">
                    {next.title} →
                </a>
            {/if}
        </div>

    </div>
    
    <div class="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
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