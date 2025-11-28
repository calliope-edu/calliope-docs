<script>
    import { onMount } from 'svelte';

    let inputValue = '';
    export let inline = false;

  onMount(() => {
    docsearch({
      inputSelector: (inline) ? '#typesenseInline' : '#typesense',
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

<div class="search-input" class:inline>
  {#if inline}
  <input type="search" placeholder="Suche..." bind:value={inputValue} id="typesenseInline">
  {:else}
  <input type="search" placeholder="Suche..." bind:value={inputValue} id="typesense">
  {/if}
  {#if inputValue.length == 0}
    <span class="search-icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
    </span>
  {/if}
</div>


<style lang="scss">
    .search-input input {
      width: 300px;
      padding: 10px 36px 10px 12px; /* room for the icon */
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
      box-sizing: border-box;
    }

    .inline, .inline input {
      width: 100%;
    }

    .inline :global(.algolia-autocomplete) {
      width: 100% !important;
    }

    .inline :global(.algolia-autocomplete .ds-dropdown-menu) {
    position: static !important;  /* Remove the floating behavior */
    width: 100%;       /* Make it the same width as the input */
    margin-top: 10px;  /* Add some space between the input and the dropdown */
    border: 1px solid #ccc;  /* Optional: Add a border around the dropdown */
    box-shadow: none;  /* Remove shadow if there's any */
  }

  .inline :global(.algolia-autocomplete .ds-dropdown-menu .ds-suggestions) {
    width: 100%;
    max-height: 600px;  /* Set a max-height for the dropdown */
    overflow-y: auto;   /* Allow scrolling if content exceeds max-height */
  }


    /* (intentionally left no-op) */

    /* Make the search icon sit inside the input on the right */
    .search-input {
      position: relative;
      display: inline-block;
    }

    .search-input .search-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      opacity: 0.75;
      font-size: 0.95rem;
    }

    /* ensure the svg inside the search icon is compact */
    .search-input .search-icon svg {
      width: 18px;
      height: 18px;
      display: block;
    }

    /* category/subcategory styling intentionally omitted - default styles used */

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
  