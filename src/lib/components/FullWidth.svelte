<script lang="ts">
    export let color = 'var(--primary-hover)';
    export let image = 'none';
    export let minH = 'auto';
</script>

<div style="background-color: {color}; background-image: {image}; min-height: {minH}">
    <slot></slot>
</div>

<style>
    div {
        width: var(--vw);
        max-width: min(var(--vw), 100vw);
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        overflow: hidden;
        background-position: center;
        background-size: cover;
    }
</style>