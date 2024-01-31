<script>
    import { selectedBoardVersion } from '$lib/scripts/store.js';
    export let dropdown = false;
    const versionen = [1,2,3]
</script>

<div>
{#if dropdown}

  <div class="ui compact tiny menu">
    <div class="ui simple dropdown item">
      Calliope mini {$selectedBoardVersion}
      <i class="dropdown icon"></i>
      <div class="menu">
        {#each versionen as num}
            <div class="item" on:click={()=>{$selectedBoardVersion=num}}>
              Calliope mini {num}
            </div>
        {/each}
      </div>
    </div>
  </div>

{:else}

  <div class="ui basic buttons">
    {#each versionen as num}
      <button class="mini ui compact button" on:click={()=>{$selectedBoardVersion=num}} class:active={$selectedBoardVersion==num}>
        v{num}
      </button>
    {/each}
  </div>

  <div class="content">
    {#if $selectedBoardVersion == 1}
      <slot name="mini1" />
    {/if}
    {#if $selectedBoardVersion == 2}
      <slot name="mini2" />
    {/if}
    {#if $selectedBoardVersion == 1 || $selectedBoardVersion == 2}
      <slot name="mini1-2" />
    {/if}
    {#if $selectedBoardVersion == 3}
      <slot name="mini3" />
    {/if}
    <slot />
  </div>

{/if}
</div>

<style lang="scss">
  .content {
    border-left: solid 3px #eee;
    padding-left: 1em;
    padding-top: 1em;
  }
</style>