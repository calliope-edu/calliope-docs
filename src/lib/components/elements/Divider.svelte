<script>
    export let color = 'calliope';
    export let align = "center";
</script>

<div style="--color: var(--color-{color}; text-align: {align};">

    <slot />
    
</div>

<style>
div {
    padding: 0.375rem; 
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; 
    font-size: 1.25rem;
    line-height: 1.75rem; 
    text-align: center; 
    color: #ffffff;
    background-color: var(--color);
}
</style>