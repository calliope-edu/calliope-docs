<script>
    export let h = 1;;
</script>

<div style="--h: {h}rem"></div>

<style>
    div {
        width: 100%;
        height: 0px;
        margin-top: var(--h);
    }
</style>