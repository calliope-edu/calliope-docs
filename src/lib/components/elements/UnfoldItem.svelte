<script context="module">
  import { writable } from 'svelte/store';
  import ExpandIcon from '~icons/ri/arrow-down-s-line'
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
    export let color = 'grau';
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
  <span class='flex border-{color}' bind:this={item}>
    <div class="item" class:active class:noclose>

          <span class="before text-{color}">
            <slot name="before"></slot>
          </span>

          <div on:click={handleClick} class='btn text-{color}'>
              <slot name='title'>{title}</slot>
              <div class='icon'>
                <ExpandIcon width="64" height="32" />
            </div>
          </div>
        
          {#if active}
            <div class="description" transition:slide|global>
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
        border-bottom-width: 1px;
    }

    .before {
      padding: 1rem 0;
    }
  
  .item {
    padding: 1rem 0;
    width: 100%;

    &.active {
      .btn .icon {
        transform: scaleY(-1);
      }

      &.noclose {
        .btn .icon {
          opacity: .4;
        }
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

      .icon {
        transition: all 0.2s;
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