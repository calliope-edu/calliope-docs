
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

</style>