<script>
    export let color = 'calliope';
    export let bg = 'white';
    export let colors = (color!='rainbow') ? [color] : ['gelb', 'rosa', 'blau', 'gruen'];
    export let size=20;
    export let thikness = 4;
    let allColors = [...colors, bg];
</script>

<div class="container my-4" style="--size:{size}px; --count:{colors.length}; --shift:{thikness}px">
    <!-- <div class="zigzag text-{color}"></div> -->
    {#each allColors as c, i}
        <div class="zigzag text-{c}" style="--shift:{thikness * i}px;"></div>
    {/each}
</div>

<style>
    .container {
        position: relative;
        width: 100%;
        height: calc(var(--size) + (var(--count) * var(--shift)));
    }

    .zigzag {
        --size: 20px;
        --halfSize: calc(var(--size) / 2);
        --color: currentcolor;
        --shift: 0px;
        background: linear-gradient(135deg, var(--color) 25%, transparent 25%) var(--halfSize) var(--halfSize),
            linear-gradient(-135deg, var(--color) 25%, transparent 25%) var(--halfSize) var(--halfSize),
            linear-gradient(45deg, var(--color) 25%, transparent 25%) 0 var(--halfSize),
            linear-gradient(-45deg, var(--color) 25%, transparent 25%) 0 var(--halfSize);
        background-size: var(--size);
        height: var(--size);
        width: 100%;
        position: absolute;
        top: var(--shift);
    }

    .B {
        top: 5px;
    }
</style>