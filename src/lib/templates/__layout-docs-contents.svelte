
<script>
    import DocsLayout from './__layout-docs.svelte';
    import Grid from '$lib/components/layout/Grid.svelte';
    import Button from '$lib/components/elements/Button.svelte';

    let currKategorie = null;
    let items = null;
    export let meta;

    $: pages = (currKategorie != null) ? currKategorie.subpages : items
    $: currTitle = (currKategorie != null) ? currKategorie.title
                    : (meta.docTitle) ?  meta.docTitle
                    : meta.title
</script>

<DocsLayout bind:currKategorie={currKategorie} bind:items={items} {meta}>

        {#if pages != null}
            <h1>{currTitle ?? ''}</h1>
            <slot />
            <Grid>
                {#each pages as page}
                        <a data-sveltekit-prefetch href="/{page.slug}/" class='unstyled'>
                            <div class='articleImage'>
                                {#if (page.image ?? null) != null}
                                    <img src={page.image} alt={page.title} />
                                {/if}
                            </div>
                            <h3>{page.title ?? ''}</h3>
                            <p>{page.description ?? ''}</p>
                            <Button>Mehr</Button>
                        </a>            
                {/each}
            </Grid>
        {/if}
</DocsLayout>  


<style>
	a {
        text-decoration: none;
        color: inherit;
    }
    a:hover {
        opacity: .8;
    }

    h1 {
        margin-bottom: 2em;
    }
</style>