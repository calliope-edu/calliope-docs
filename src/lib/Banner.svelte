<script>
    export let text = "LOREM";
    export let farbe = 'green';
</script>

<p class={farbe}>
    <b>{text}</b>
</p>

<p>Test</p>

<style>
    .red {
        color: red;
    }
    .green {
        color: green;
    }
</style>