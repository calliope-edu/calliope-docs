<script>
  import IconCircle from './IconCircle.svelte';
</script>

<IconCircle color="#F87171">
  <path slot="path"
    d="M0 0L6 6M6 0L0 6"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <span aria-label="Nein">
    <slot />
  </span>
</IconCircle>
