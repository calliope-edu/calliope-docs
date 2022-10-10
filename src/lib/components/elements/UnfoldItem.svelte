<script context="module">
  import { writable } from 'svelte/store';
  const current = writable({});
</script>

<script>
    import { slide } from "svelte/transition";
    // import {onMount} from 'svelte'
    import { createEventDispatcher } from 'svelte';

    export let title = '';
    export let content = '';
    export let active = false;
    export let controlled = false;
    export let group = '';
    export let noclose = false;
    let item;
    let opened = active;

    $: if(group != '' && $current[group] && $current[group] != item) {
      active = ($current[group] === item);
    }

    const dispatch = createEventDispatcher();

    function handleClick(event) {
      if(controlled) {
        dispatch('click', event);
      } else {
        if(group === '') {
          active = (!active || noclose);
        } else {
          if($current[group] === item && !noclose){
            $current[group] = undefined;
            active = false;
          } else {
            $current[group] = item;
            active = true;
          }
        }
        
      }
    }

</script>

  <!-- {#if mounted} -->
  <span class='flex' bind:this={item}>
    <div class="item" class:active={active}>

          <span class="before">
            <slot name="before"></slot>
          </span>

          <div on:click={handleClick} class='btn'>
              <slot name='title'>{title}</slot>
              <svg
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M7.69582 7.43966L8.03537 7.75362L8.37483 7.43957L15.3174 1.01671L15.4399 1.12995L8.03171 7.98328L0.625303 1.1316L0.749564 1.0167L7.69582 7.43966ZM15.5351 1.21799C15.5351 1.21796 15.5351 1.21794 15.535 1.21791L15.5351 1.21799Z"
                  class="fill-calliope stroke-calliope" />
              </svg>
          </div>
        
          {#if active}
            <div class="description" transition:slide>
              <slot>
                {content}
              </slot>
            </div>
          {/if} 

      </div>

      </span>
      
  <!-- {/if} -->

  <noscript>
      <span class='flex'>
        <details class="title">
            <summary>
              <slot name='title'>{title}</slot>
            </summary>
            <slot>
              {content}
            </slot>
        </details>
      </span>
  </noscript>


<style lang="scss">

.item {
display: grid;
grid-template-columns: min-content 1fr;
grid-template-rows: repeat(2, min-content);
// grid-column-gap: 0px;
// grid-row-gap: 0px;
align-items: center
}

.before { grid-area: 1 / 1 / 2 / 2; }
.btn { grid-area: 1 / 2 / 2 / 3; }
.description { grid-area: 2 / 2 / 3 / 3; }

  .flex {
    max-width: 600px;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: start;

       &:not(:last-child) {
        border-bottom: 1px solid #eee;
    }

    .before {
      padding: 1rem 0;
    }
  
  .item {
    padding: 1rem 0;
    width: 100%;

    &.active {
      .btn svg {
        transform: scaleY(-1);
      }
    }

    .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      cursor: pointer;

      span {
        font-size: 1rem;
        font-weight: 600;
        margin-right: 1rem;
        text-align: left;
      }

      svg {
        transition: transform 0.2s;
      }

      & + .description {
        padding-top: 1.5rem;
      }
    }

    .description {
      padding-right: 2rem;
      color: #666;
    }
  }

    details {
      width: 100%;
      
      summary {
        font-size: 1.1rem;
        padding: 1em 0;
      }
  
    }

  }

</style>