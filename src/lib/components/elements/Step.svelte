<script >import clsx from 'clsx';
import { tick } from 'svelte';
import { getStepsContext } from './Steps.svelte';
const { steps, register } = getStepsContext();
let li;
let index = register();
export let title = null;
export let description = null;
export let orientation = 'horizontal';
$: if ($steps > 0 && li) {
    tick().then(() => {
        index = Array.from(li.parentElement.children).indexOf(li) + 1;
    });
}
</script>

<li
  class={clsx(
    'step relative pl-10 1200:grid before:content-[counter(step)] before:absolute',
    'before:left-0 before:flex before:items-center before:justify-center before:w-6',
    'before:h-6 before:text-[0.7rem] before:font-bold before:text-white',
    'before:rounded-full before:shadow-md before:bg before:bg-calliope before:border before:border-gray-soft',
    index !== $steps &&
      'pb-1 after:absolute after:top-8 after:bottom-[-1rem] after:left-3 after:w-px after:bg-calliope',
    orientation === 'horizontal' ? 'grid-cols-5 gap-10' : 'grid-cols-4 gap-4',
  )}
  style="counter-increment: step;"
  bind:this={li}
>
  <div class={clsx('mb-6 1200:mb-2', orientation === 'horizontal' ? 'col-span-2' : 'col-span-4')}>
    <span class="not-prose mb-4 text-base font-semibold leading-6 text-calliope">
      {#if $$slots.title}
        <slot name="title" />
      {:else if title}
        <h3>{title}</h3>
      {/if}
    </span>

    <div class="description text-sm">
      {#if $$slots.description}
        <slot name="description" />
      {:else if description}
        <p>{description}</p>
      {/if}
    </div>
  </div>

  <div class={clsx(orientation === 'horizontal' ? 'col-span-3' : 'col-span-4')}>
    <slot />
  </div>
</li>
