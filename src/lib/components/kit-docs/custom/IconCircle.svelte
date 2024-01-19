<script>
  export let color = "#34D399";
</script>

<div class="wrapper" style="--color: {color}">
    <div class="inner">
      <svg
        width="6"
        height="6"
        aria-hidden="true"
      >
      <svg
        width="6"
        height="4.5"
        aria-hidden="true"
      >
        <slot name="path" />
      </svg>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
  
  <style lang="scss">
    .wrapper {
      display: flex; 
      margin-top: 2.5rem;
      margin-bottom: 2.5rem; 
      align-items: flex-start; 
      .inner {
        display: flex; 
        margin-right: 0.625rem; 
        margin-left: -0.25rem; 
        justify-content: center; 
        align-items: center; 
        border-radius: 9999px; 
        width: 1.5rem; 
        height: 1.5rem; 
        color: #ffffff; 
        background-color: var(--color); 
        min-height: 24px;
        min-width: 24px;
        svg {
          overflow: visible; 
          transform: scale(1.3);
        }
      }
      .content {
        margin-top: 1px; 
        line-height: 1.5rem; 
      }
    }
  </style>
  