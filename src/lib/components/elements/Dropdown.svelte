<!-- Enhanced Dropdown Component using svelte-floating-ui -->
<script module lang="ts">
  const openDropdowns = new Set<{ close: () => void }>();

  export function closeAllDropdowns() {
    openDropdowns.forEach((dropdown) => {
      dropdown.close();
    });
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import { onClickOutside } from 'runed';
  import { createFloatingActions } from 'svelte-floating-ui';
  import { offset, flip, shift } from 'svelte-floating-ui/dom';
  import Portal from 'svelte-portal';  let {
    isOpen = $bindable(),
    trigger,
    children,
    tooltip,
    position = 'right',
    minWidth = '120px',
    closeOnClick = true,
    usePortal = true,
    useFloating = true,
    placement = 'bottom-end',
    offsetDistance = 8,
    triggerMode = 'click',
    hoverShowDelay = 100,
    hoverHideDelay = 150,
    ...restProps
  }: {
    isOpen?: boolean;
    trigger: Snippet;
    children: Snippet;
    tooltip?: Snippet;
    position?: 'left' | 'right' | 'center';
    minWidth?: string;
    closeOnClick?: boolean;
    usePortal?: boolean;
    useFloating?: boolean;
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
    offsetDistance?: number;
    triggerMode?: 'click' | 'hover' | 'rightclick' | 'both';
    hoverShowDelay?: number;
    hoverHideDelay?: number;
  } = $props();let triggerElement: HTMLElement = $state()!;
  let dropdownElement: HTMLElement = $state()!;
  let hoverTimeout: number | null = $state(null);
  let isHoverMode = $state(false); // Track if we're showing tooltip (hover) or menu (click)

  // Create a dropdown instance object for the registry
  const dropdownInstance = {
    close: () => {
      isOpen = false;
    }
  };
  // Hover event handlers
  function handleMouseEnter() {
    if (triggerMode === 'hover') {
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      // Small delay to prevent flickering
      hoverTimeout = setTimeout(() => {
        if (!isOpen) {
          closeOtherDropdowns();
        }
        isHoverMode = true;
        isOpen = true;
      }, hoverShowDelay);
    }
  }

  function handleMouseLeave() {
    if (triggerMode === 'hover') {
      // Clear the timeout if we're leaving before it triggered
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      // Delay before closing to allow moving to dropdown
      hoverTimeout = setTimeout(() => {
        isOpen = false;
      }, hoverHideDelay);
    }
  }
  // Register this dropdown instance on mount
  onMount(() => {
    openDropdowns.add(dropdownInstance);
    return () => openDropdowns.delete(dropdownInstance);
  });

  function closeOtherDropdowns() {
    openDropdowns.forEach((dropdown) => {
      if (dropdown !== dropdownInstance) {
        dropdown.close();
      }
    });
  }

  // Setup click outside detection with iframe support
  const clickOutside = onClickOutside(
    () => dropdownElement,
    () => {
      if (isOpen) {
        isOpen = false;
      }
    },
    {
      immediate: false, // We'll start/stop this manually
      detectIframe: true // This handles iframe clicks!
    }
  );

  // Start/stop click outside detection when dropdown opens/closes
  $effect(() => {
    if (isOpen) {
      clickOutside.start();
    } else {
      clickOutside.stop();
    }
  });
  // Create floating UI actions when useFloating is enabled
  const [floatingRef, floatingContent, update] = createFloatingActions({
    strategy: 'fixed',
    placement: placement,
    middleware: [
      offset(offsetDistance),
      flip(),
      shift({ padding: 8 })
    ]
  });

  function handleMenuClick() {
    if (closeOnClick) {
      isOpen = false;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
      triggerElement?.focus();
    }
  }  // Right-click event handler
  function handleRightClick(event: MouseEvent) {
    if (triggerMode === 'rightclick' || triggerMode === 'both') {
      event.preventDefault(); // Prevent default context menu
      event.stopPropagation();
      
      if (!isOpen) {
        closeOtherDropdowns();
      }
      isHoverMode = false; // Right-click always shows menu content
      isOpen = !isOpen;
    }
  }

  function toggleDropdown(event: Event) {
    // Only handle click events for click or both modes
    if (triggerMode === 'hover' || triggerMode === 'rightclick') {
      return;
    }
    
    event.stopPropagation(); // Prevent event bubbling
    
    if (!isOpen) {
      // Close other dropdowns before opening this one
      closeOtherDropdowns();
      isHoverMode = false; // Click mode shows menu content
    }
    
    isOpen = !isOpen;
  }
</script>

{#if useFloating}
  <!-- Floating UI Implementation -->
  <div class="dropdown-container" {...restProps}>    <!-- Trigger -->
    <div 
      role="button" 
      tabindex="0"
      bind:this={triggerElement}
      use:floatingRef
      onclick={toggleDropdown}
      oncontextmenu={handleRightClick}
      onkeydown={(e) => e.key === 'Enter' && toggleDropdown(e)}
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
    >
      {@render trigger()}
    </div>

    <!-- Dropdown Content -->
    {#if isOpen}
      {#if usePortal}        <Portal>
          <div 
            bind:this={dropdownElement}
            use:floatingContent 
            role="menu"
            tabindex="-1"
            onclick={handleMenuClick}
            onkeydown={handleKeydown}
            onmouseenter={handleMouseEnter}
            onmouseleave={handleMouseLeave}
            class="dropdown-content floating"
            style="min-width: {minWidth};"
          >
            {#if isHoverMode && tooltip}
              {@render tooltip()}
            {:else}
              {@render children()}
            {/if}
          </div>
        </Portal>
      {:else}        <div 
          bind:this={dropdownElement}
          use:floatingContent 
          role="menu"
          tabindex="-1"
          onclick={handleMenuClick}
          onkeydown={handleKeydown}
          onmouseenter={handleMouseEnter}
          onmouseleave={handleMouseLeave}
          class="dropdown-content floating"
          style="min-width: {minWidth};"
        >
          {#if isHoverMode && tooltip}
            {@render tooltip()}
          {:else}
            {@render children()}
          {/if}
        </div>
      {/if}
    {/if}
  </div>
{:else}
  <!-- Standard CSS-only Implementation -->
  <div class="dropdown-container" {...restProps}>    <!-- Trigger -->
    <div 
      role="button" 
      tabindex="0"
      bind:this={triggerElement}
      onclick={toggleDropdown}
      oncontextmenu={handleRightClick}
      onkeydown={(e) => e.key === 'Enter' && toggleDropdown(e)}
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
    >
      {@render trigger()}
    </div>

    <!-- Dropdown Content -->
    {#if isOpen}
      {#if usePortal}        <Portal>
          <div 
            bind:this={dropdownElement}
            role="menu"
            tabindex="-1"
            onclick={handleMenuClick}
            onkeydown={handleKeydown}
            onmouseenter={handleMouseEnter}
            onmouseleave={handleMouseLeave}
            class="dropdown-content standard {position}"
            style="min-width: {minWidth};"
          >
            {#if isHoverMode && tooltip}
              {@render tooltip()}
            {:else}
              {@render children()}
            {/if}
          </div>
        </Portal>
      {:else}        <div 
          bind:this={dropdownElement}
          role="menu"
          tabindex="-1"
          onclick={handleMenuClick}
          onkeydown={handleKeydown}
          onmouseenter={handleMouseEnter}
          onmouseleave={handleMouseLeave}
          class="dropdown-content standard {position}"
          style="min-width: {minWidth};"
        >
          {#if isHoverMode && tooltip}
            {@render tooltip()}
          {:else}
            {@render children()}
          {/if}
        </div>
      {/if}
    {/if}
  </div>
{/if}

<style>
  @layer components {
    .dropdown-container {
      position: relative;
      display: inline-block;
    }
    .dropdown-content {
      background: hsl(0, 0%, 98%); /* #FAFAFA - white background */
      border-radius: 0.5rem; /* Pill designed - no sharp corners */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Decent shadow for menus */
      z-index: 999999;
      overflow: hidden;
      animation: dropdownIn 0.15s ease-out;
    }

    .dropdown-content.floating {
      /* Floating UI handles positioning automatically */
      position: fixed;
      z-index: 999999;
    }    .dropdown-content.standard {
      position: absolute;
      top: 100%;
      margin-top: 0.25rem;
      z-index: 999999;
    }

    .dropdown-content.standard.left {
      left: 0;
    }

    .dropdown-content.standard.right {
      right: 0;
    }

    .dropdown-content.standard.center {
      left: 50%;
      transform: translateX(-50%);
    }
    @keyframes dropdownIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
