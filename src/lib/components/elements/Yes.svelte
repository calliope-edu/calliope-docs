<script>
  import IconCircle from './IconCircle.svelte';
</script>

<IconCircle color="#34D399">
  <path slot="path"
    d="M6 0L2 4.5L0 2.5"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <span aria-label="Ja">
    <slot />
  </span>
</IconCircle>
