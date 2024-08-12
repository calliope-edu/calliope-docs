<script>
    import { selectedBoardVersion } from '$lib/scripts/store.js';
    export let v;  // Die erwartete Version für diesen Tag
</script>

{#if $selectedBoardVersion == v}
    <slot />
{/if}