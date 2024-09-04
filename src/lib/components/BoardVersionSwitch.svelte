<script>
	import { selectedBoardVersion } from '$lib/scripts/store.js';
	import BoardVersionSelector from '$lib/components/BoardVersionSelector.svelte';
	const versionen = [1, 2, 3];
    export let navbar = false;
</script>
{#if navbar}
<div class="boardSelector">
<BoardVersionSelector />
</div>
{/if}

<div class="content">
    {#if $selectedBoardVersion == 1}
        <slot name="mini1" />
    {/if}
    {#if $selectedBoardVersion == 2}
        <slot name="mini2" />
    {/if}
    {#if $selectedBoardVersion == 1 || $selectedBoardVersion == 2}
        <slot name="mini1-2" />
    {/if}
    {#if $selectedBoardVersion == 2 || $selectedBoardVersion == 3}
    <slot name="mini2-3" />
    {/if}
    {#if $selectedBoardVersion == 3}
        <slot name="mini3" />
    {/if}
    <slot />
</div>

<style lang="scss">
.boardSelector {
    margin-bottom: calc(2rem - 0.1428571429em);
}
</style>