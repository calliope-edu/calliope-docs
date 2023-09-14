<script>
    export let id;
</script>

<div class="container">
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/{id}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="video"></iframe>
</div>

<style lang="scss">
    .container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
    }
    .video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
    }
</style>