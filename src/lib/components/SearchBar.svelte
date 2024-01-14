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
      });
    });
  </script>


<div>
    <input type="search" id="searchbar">
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
  