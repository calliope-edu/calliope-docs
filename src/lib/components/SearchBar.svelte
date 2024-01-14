<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      docsearch({
        inputSelector: '#searchbar',
        typesenseCollectionName: 'calliope-docs',
        typesenseServerConfig: { 
          nodes: [{
            host: 'search.docs.calliope.cc',
            port: '443', 
            protocol: 'https' 
          }],
          apiKey: 'tNEoljSnhaBUD3To5spLNEuPWNKLiVxQ',
        },
        typesenseSearchParameters: { // In some docsearch plugins (see above), this might be called `typesenseSearchParams` 
          // ... 
          query_by:
            'hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,embedding',
          vector_query: 'embedding:([], k: 5, distance_threshold: 1.0, alpha: 0.2)' // Optional vector search fine-tuning
        },
      });
    });

  </script>


<div>
    <input type="search" id="searchbar" placeholder="Suche...">
</div>


<style>
    input {
      width: 300px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
    }
  
  </style>
  