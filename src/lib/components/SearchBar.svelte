<script>
    import { onMount } from 'svelte';

    let inputValue = '';
  
    onMount(() => {
      docsearch({
        inputSelector: '#typesense',
        typesenseCollectionName: 'calliope-docs',
        typesenseServerConfig: { 
          nodes: [{
            host: 'search.docs.calliope.cc',
            port: '443', 
            protocol: 'https' 
          }],
          apiKey: 'tNEoljSnhaBUD3To5spLNEuPWNKLiVxQ',
        },
        typesenseSearchParameters: {
          query_by:
            'hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,embedding',
             vector_query: 'embedding:([], k: 5, distance_threshold: 1.0, alpha: 0.2)' // Optional vector search fine-tuning
        },
      });
    });

  </script>

<div class="ui icon input">
  <input type="search" placeholder="Suche..." bind:value={inputValue} id="typesense">
  {#if inputValue.length == 0}
  <i class="search icon"></i>
  {/if}
</div>


<style lang="scss">
    input {
      width: 300px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
    }


    :global(.algolia-autocomplete .ds-dropdown-menu) {
      // width: 500px;
    }

    :global(.algolia-autocomplete .typesense-docsearch-suggestion--category-header) {
      // color: darkgray;
    }

    :global(.algolia-autocomplete .typesense-docsearch-suggestion--subcategory-column) {
      // color: gray;
    }

    :global(.algolia-autocomplete .typesense-docsearch-suggestion--title) {
      font-weight: bold;
    }

    :global(.algolia-autocomplete .typesense-docsearch-suggestion--text) {
      color: gray;
    }

    :global(.algolia-autocomplete .typesense-docsearch-suggestion--highlight) {
      color: var(--color-calliope);
    }
      
</style>
  