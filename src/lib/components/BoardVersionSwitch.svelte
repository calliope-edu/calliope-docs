<script>
	import { selectedBoardVersion } from '$lib/scripts/store.js';
	const versionen = [1, 2, 3];
</script>

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
    {#if $selectedBoardVersion == 3}
        <slot name="mini3" />
    {/if}
    <slot />
</div>

<style lang="scss">
.content {
    // border-left: solid 3px #eee;
    // padding-left: 1em;
    padding-top: 1em;
}
</style>