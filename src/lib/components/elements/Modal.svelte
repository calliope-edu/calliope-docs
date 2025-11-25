<script lang="ts">
  import Portal from 'svelte-portal';
  import type { Snippet } from 'svelte';  let {
    title = '',
    isOpen = true,
    size = 'medium',
    showCloseButton = true,
    header = 'auto',
    closeOnBackdropClick = showCloseButton,
    onClose,
    children,
    actions,
    placement = 'center'
  }: {
    title?: string;
    isOpen?: boolean;
    size?: 'small' | 'medium' | 'large' | 'fullscreen';
    showCloseButton?: boolean;
    header?: 'auto' | true | false;
    closeOnBackdropClick?: boolean;
    onClose?: () => void;
    children?: Snippet;
    actions?: Snippet;
    placement?: 'center' | 'left' | 'right';
  } = $props();
  // Determine if header should be shown
  let showHeader = $derived(header === true || (header === 'auto' && (title || showCloseButton)));
  
  // Determine if we need a floating close button (when header is hidden but close button is needed)
  let showFloatingCloseButton = $derived(header === false && showCloseButton);
  let isPlacementRight = $derived(placement === 'right');
  let isPlacementLeft = $derived(placement === 'left');

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && closeOnBackdropClick && onClose) {
      onClose();
    }
  }


  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && onClose) {
      onClose();
    }
  }

  function handleCloseClick() {
    if (onClose) {
      onClose();
    }
  }
</script>
 <Portal>
{#if isOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="modal-overlay" 
    onclick={handleBackdropClick}
    onkeydown={handleKeyDown}
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-labelledby={title && showHeader ? "modal-title" : undefined}
    aria-label={title && !showHeader ? title : undefined}
    class:placement-right={isPlacementRight}
    class:placement-left={isPlacementLeft}
  >
    <div class="modal-content {size ? `size-${size}` : ''}" class:has-floating-close={showFloatingCloseButton}>
      <!-- Floating Close Button (when header is disabled but close is needed) -->
      {#if showFloatingCloseButton}
        <button 
          class="modal-floating-close-button" 
          onclick={handleCloseClick}
          aria-label="Close modal"
        >
          <span class="close-icon">✕</span>
        </button>
      {/if}

      <!-- Header -->
      {#if showHeader}
        <div class="modal-header" class:no-title={!title}>
          {#if title}
            <h2 id="modal-title" class="modal-title">{title}</h2>
          {/if}
          
          {#if showCloseButton}
            <button 
              class="modal-close-button" 
              onclick={handleCloseClick}
              aria-label="Close modal"
            >
              <span class="close-icon">✕</span>
            </button>
          {/if}
        </div>
      {/if}

      <!-- Scrollable Content -->
      {#if children}
        <div class="modal-body">
          {@render children()}
        </div>
      {/if}

      <!-- Actions Footer -->
      {#if actions}
        <div class="modal-footer">
          {@render actions()}
        </div>
      {/if}
    </div>
  </div>
{/if}
</Portal>
<style lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(47, 48, 49, 0.6); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(10px);
    padding: 1rem;
  }
  .modal-content {
    background: #FAFAFA; 
    border-radius: 20px; 
    box-shadow: 0 25px 50px rgba(27, 28, 29, 0.25);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow: hidden;
    animation: modalEnter 0.3s ease-out;
    position: relative;
    

    &.size-small {
      width: 90%;
      max-width: 400px;
    }
    
    &.size-medium {
      width: 90%;
      max-width: 600px;
    }
    
    &.size-large {
      width: 90%;
      max-width: 800px;
    }
    
    &.size-fullscreen {
      width: 95%;
      max-width: 1200px;
    }

    &.has-floating-close {
      padding-top: 3rem;
    }
  }

  @keyframes modalEnter {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  .modal-header {
    background: #ffffff; 
    border-bottom: 1px solid #E8EDEB;
    color: #141414; 
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-radius: 20px 20px 0 0;
    
    &.no-title {
      justify-content: flex-end;
    }
    
    .modal-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  }
  .modal-close-button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    // color: #202020;
    
    &:hover {
      background: rgba(156, 156, 156, 0.3);
      transform: scale(1.1);
      color:#141414
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    .close-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      line-height: 1;
      
      :global(svg) {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
  .modal-floating-close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(27, 28, 29, 0.8);
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #FAFAFA;
    z-index: 10;
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(27, 28, 29, 0.9);
      transform: scale(1.1);
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    .close-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      line-height: 1;
      
      :global(svg) {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    color: #1B1C1D; 
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    
 
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: #E8EDEB; 
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #90A4A8; 
      border-radius: 10px;
      
      &:hover {
        background: #1B1C1D; 
      }
    }
  }

  .modal-footer {
    flex-shrink: 0;
    padding: 1.5rem 2rem;
    background: #FAFAFA; 
    border-top: 1px solid #E8EDEB; 
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    border-radius: 0 0 20px 20px;
  }


  @media (max-width: 768px) {
    .modal-overlay {
      padding: 0.5rem;
    }
    
    .modal-content {
      width: 100%;
      height: 100%;
      max-height: 100vh;
      border-radius: 0;
      
      &.size-small,
      &.size-medium,
      &.size-large,
      &.size-fullscreen {
        width: 100%;
        max-width: none;
      }
    }
      .modal-header {
      padding: 1rem 1.5rem;
      border-radius: 0;
      
      &.no-title {
        justify-content: flex-end;
      }
      
      .modal-title {
        font-size: 1.25rem;
      }
        .modal-close-button {
        width: 2rem;
        height: 2rem;
        
        .close-icon {
          font-size: 1rem;
          
          :global(svg) {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }    .modal-floating-close-button {
      top: 0.75rem;
      right: 0.75rem;
      width: 2rem;
      height: 2rem;
      
      .close-icon {
        font-size: 1rem;
        
        :global(svg) {
          width: 1rem;
          height: 1rem;
        }
      }
    }
    
    .modal-body {
      padding: 1.5rem;
    }
    
    .modal-footer {
      padding: 1rem 1.5rem;
      border-radius: 0;
      flex-direction: column;
      
      :global(button) {
        width: 100%;
      }
    }
  }

</style>
