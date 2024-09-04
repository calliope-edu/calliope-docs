<script>
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
<!-- Last: class:stepIndex={index !== $steps || true} -->
<li
  class="step"
  class:horizontal={orientation === 'horizontal'}
  bind:this={li}
>
  <div class="step-box" class:horizontal={orientation === 'horizontal'}>
    <span class="step-title">
      {#if $$slots.title}
        <slot name="title" />
      {:else if title}
        <h3>{title}</h3>
      {/if}
    </span>

    <div class="description">
      {#if $$slots.description}
        <slot name="description" />
      {:else if description}
        <p>{description}</p>
      {/if}
    </div>
  </div>

  <div class="step-content" class:horizontal={orientation === 'horizontal'}>
    <slot />
  </div>
</li>

<style lang="scss">
.step {
  position: relative;
  padding-left: 2.7rem; /* pl-10 */
  padding-top:.2rem;
  counter-increment: step; /* counter-increment for step */
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* grid-cols-4 */
  gap: 1rem; /* gap-4 */
  margin-bottom: 1rem;
  padding-bottom: 0.25rem; /* pb-1 */

  &.horizontal {
    grid-template-columns: repeat(5, 1fr); /* grid-cols-5 */
    gap: 2.5rem; /* gap-10 */
  }

  &::before {
    content: counter(step);
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem; /* w-6 */
    height: 2rem; /* h-6 */
    font-size: 0.7rem; /* text-[0.7rem] */
    font-weight: bold; /* font-bold */
    color: white; /* text-white */
    border-radius: 50%; /* rounded-full */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* shadow-md */
    background-color: var(--color-calliope); /* bg-calliope */
    // border: 1px solid rgba(0,0,0,.1); /* border-gray-soft */
  }

  &::after {
      content: "";
      position: absolute;
      top: 2rem; /* top-8 */
      bottom: -1rem; /* bottom-[-1rem] */
      left: 1rem; /* left-3 */
      width: 1px; /* w-px */
      background-color: var(--color-calliope); /* bg-calliope */
  }

}

.step-box {
  margin-bottom: 1.5rem; /* mb-6 */
  grid-column: span 4 / span 4; /* col-span-4 */
  
  @media (min-width: 1200px) {
    margin-bottom: 0.5rem; /* 1200:mb-2 */
  }

  &.horizontal {
    grid-column: span 2 / span 2; /* col-span-2 */
  }
}

.step-title {
  font-size: 1rem; /* text-base */
  font-weight: 600; /* font-semibold */
  line-height: 1.5rem; /* leading-6 */
  color: var(--color-calliope); /* text-calliope */
  margin-bottom: 1rem; /* mb-4 */
}

.step-content {
  grid-column: span 4 / span 4;
  
  &.horizontal {
    grid-column: span 3 / span 3; /* col-span-3 */
  }
}


.description {
  font-size: 0.875rem;
  line-height: 1.25rem; 
}
</style>
