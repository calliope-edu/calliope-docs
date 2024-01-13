<script>
    import { selectedBoardVersion } from '$lib/store.js';
</script>
  
  <div>
    <label>
      <input type="radio" bind:group={$selectedBoardVersion} value={1} on:change={() => handleOptionChange(1)} />
      <div class="button">mini 1</div>
    </label>
  
    <label>
      <input type="radio" bind:group={$selectedBoardVersion} value={2} on:change={() => handleOptionChange(2)} />
      <div class="button">mini 2</div>
    </label>
  
    <label>
      <input type="radio" bind:group={$selectedBoardVersion} value={3} on:change={() => handleOptionChange(3)} />
      <div class="button">mini 3</div>
    </label>
  </div>

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

<style lang="scss">
    div {
    display: flex;
    gap: 5px;
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  input {
    display: none;
  }

  .button {
    background-color: #ffffff;
    // color: #353535;
    border: none;
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    /* text-transform: uppercase; */
    border-radius: 50px;
  }

  .button:hover {
    background-color: #c5c5c5;
  }

  input:checked + .button {
    background-color: rgb(66 201 203);
    color: #fff;
  }
</style>