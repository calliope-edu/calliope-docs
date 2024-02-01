
<script>
    import DocsLayout from './__layout-docs.svelte';
    import Grid from '$lib/components/layout/Grid.svelte';
    import Button from '$lib/components/elements/Button.svelte';
    import { _l, _l_path } from '$lib/scripts/store.js';

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
            <slot />
            <div class="ui two cards">
                <!-- <Grid> -->
                {#each pages as page}
                            
                            <a data-sveltekit-prefetch class="ui card" href="/{$_l_path}{page.slug}/">
                                {#if (page.image ?? null) != null}
                                    <div class="image">
                                        <img src={page.image} alt={page.title} />
                                    </div>
                                {/if}
                                <div class="content">
                                  <div class="header">
                                    {page.title ?? ''}
                                  </div>
                                  <!-- <div class="meta">
                                    Friends of Veronika
                                  </div> -->
                                  <div class="description">
                                    {page.description ?? ''}
                                  </div>
                                </div>
                                <div class="ui button">
                                    Mehr
                                    <i class="arrow right icon"></i>
                                </div>
                            </a>
                {/each}
                <!-- 
                    {#each pages as page}
                            <a data-sveltekit-prefetch href="/{$_l_path}{page.slug}/" class='unstyled'>
                                <div class='articleImage'>
                                    {#if (page.image ?? null) != null}
                                        <img src={page.image} alt={page.title} />
                                    {/if}
                                </div>
                                <h3>{page.title ?? ''}</h3>
                                <p>{page.description ?? ''}</p>
                                <Button>Mehr</Button>
                            </a>            
                    {/each}-->
                <!-- </Grid>  -->
                </div>
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