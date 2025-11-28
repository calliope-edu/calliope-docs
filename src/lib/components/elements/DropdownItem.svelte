<!-- DropdownItem.svelte - Reusable dropdown item component -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { closeAllDropdowns } from './Dropdown.svelte';
  
  let {
    onselected,
    disabled = false,
    selected = false,
    href,
    target,
    role = 'menuitem',
    ariaLabel,
    title,
    children,
    closeOnClick = true,
    ...restProps
  }: {
    onselected?: (event: MouseEvent) => void;
    disabled?: boolean;
    selected?: boolean;
    href?: string;
    target?: string;
    role?: string;
    ariaLabel?: string;
    title?: string;
    children?: Snippet;
    closeOnClick?: boolean;
  } = $props();

  // Determine if this should be a link or button
  let isLink = $derived(!!href);

  function handleClick(event: MouseEvent) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    // Close all dropdowns when item is clicked (unless disabled)
    if (closeOnClick) {
      closeAllDropdowns();
    }
    
    if (onselected) {
      onselected(event);
    }
  }
</script>

{#if isLink}
  <a
    {href}
    {target}
    {role}
    aria-label={ariaLabel}
    {title}
    class="dropdown-item"
    class:selected
    class:disabled
    onclick={handleClick}
    {...restProps}
  >
    {#if children}
        {@render children?.()}
    {:else}
        {title}
    {/if}
  </a>
{:else}
  <button
    onclick={handleClick}
    {disabled}
    {role}
    aria-label={ariaLabel}
    {title}
    class="dropdown-item"
    class:selected
    {...restProps}
  >
    {#if children}
        {@render children?.()}
    {:else}
        {title}
    {/if}
  </button>
{/if}

<style>
  .dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: hsl(210, 4%, 11%); /* #1B1C1D dark text on white background */
    font-size: 0.875rem;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    font-family: 'Roboto', sans-serif;
    text-decoration: none;
  }

  .dropdown-item:hover:not(:disabled) {
    background: hsl(156, 12%, 92%); /* #E8EDEB light grey hover */
  }

  .dropdown-item.selected,
  .dropdown-item:disabled {
    background: hsl(190, 12%, 61%); /* #90A4A8 decent grey for active item */
    color: hsl(210, 4%, 11%); /* #1B1C1D */
    cursor: not-allowed;
  }
  .dropdown-item:focus-visible {
    outline: 2px solid hsl(181, 57%, 53%); /* Calliope brand cyan for focus */
    outline-offset: 2px;
  }

  /* Global styles for icons in dropdown items */
  .dropdown-item :global(svg) {
    flex-shrink: 0;
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .dropdown-item {
      padding: 0.625rem 0.75rem;
    }
    
    .dropdown-item :global(svg) {
      width: 0.875rem;
      height: 0.875rem;
      margin-right: 0.375rem;
    }
  }
</style>
