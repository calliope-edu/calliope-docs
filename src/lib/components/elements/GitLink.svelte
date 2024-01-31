<script>
    export let repo;
    export let branch = false;
    export let inline = false;
    export let size = '';

    $: link = (branch ? `https://github.com/${repo}/tree/${branch}` : `https://github.com/${repo}`)

    $: elm = (inline? 'span' : 'p');
</script>
<svelte:element this={elm}>
    <a href={link} target="_blank" class="ui blue image label {size}">
        <i class="github icon"></i>
            {repo}
        {#if branch}
            <!-- <button class="ui disabled button">#{branch}</button> -->
            <div class="detail">#{branch}</div>
        {/if}
    </a>
</svelte:element>

<style lang="scss">
    // .label {
    //     margin-bottom: 0.25rem;
    // }
</style>