
<script>
    import DocsMenu from '$lib/components/menues/DocsMenu.svelte';
    import Toc from 'svelte-toc'

    let headingSelector = 'main :where(h2, h3, h4):not(.toc-exclude)';
    let breakpoint = 1200;
    let headings = [];
    let desktop = false;
    $: hide = (headings.length < 2);
    $: gridColumns = (!desktop) ? '' : ' 200px';
    $: gridMaxWidth = (!desktop) ? 1 : 2;

    let prev = null;
    let next = null;
</script>

<div style='grid-template-columns: 200px 1fr {gridColumns}; max-width: calc(75ch + {gridMaxWidth} * (200px + 20px))'>

    <aside>
        <DocsMenu bind:prev={prev} bind:next={next} />
    </aside>

    <main>
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

    </main>
    
    <Toc title="" {headingSelector} {breakpoint} {hide}
        bind:headings={headings} 
        bind:desktop={desktop}
    />

</div>

<style>

div {
    
    margin: auto;
    position: relative;
    display: grid;
    column-gap: 40px;
    /* grid-template-columns: 200px 1fr 200px; */
    /* max-width: calc(75ch + 2 * 200px + 2* 40px); */
}

aside {
    position: sticky;
    top: 2em;
    height: max-content;
}

div :global(.toc-clicked) {
  color: cornflowerblue;
}


</style>