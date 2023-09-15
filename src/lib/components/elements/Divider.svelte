<script>
    export let color = 'calliope';
    export let align = "center";
</script>

<div class="not-prose text-{align} text-white bg-{color} font-mono p-1.5 text-xl">

    <slot />
    
</div>