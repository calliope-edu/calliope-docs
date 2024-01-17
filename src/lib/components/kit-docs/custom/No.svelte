<div class="wrapper">
  <div
    class="inner"
  >
    <svg
      width="6"
      height="6"
      aria-hidden="true"
    >
      <path
        d="M0 0L6 6M6 0L0 6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
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
      position: relative; 
      margin-right: 0.625rem; 
      margin-left: -0.25rem; 
      justify-content: center; 
      align-items: center; 
      border-radius: 9999px; 
      width: 1.5rem; 
      height: 1.5rem; 
      color: #ffffff; 
      background-color: #F87171; 
      min-height: 24px;
      min-width: 24px;
      svg {
        overflow: visible; 
        transform: scale(1.2);
      }
    }
    .content {
      margin-top: 1px; 
      line-height: 1.5rem; 
    }
  }
</style>
