
<script>
    import DocsLayout from './__layout-docs.svelte';

    let currKategorie = null;

</script>

<DocsLayout bind:currKategorie={currKategorie}>
        {#if currKategorie != null}
            <h1>{currKategorie.title}</h1>
            <ol>
                {#each currKategorie.subpages as page}
                    <li>
                        <a sveltekit:prefetch href="/{page.slug}/" class='unstyled'>
                            <h3>{page.title}</h3>
                            <p>{page.description}</p>
                        </a>
                        <hr>
                    </li>               
                {/each}
            </ol>
        {/if}
        <!-- <slot /> -->
</DocsLayout>  



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