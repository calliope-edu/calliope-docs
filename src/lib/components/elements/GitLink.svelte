<script>
    export let repo;
    export let branch = false;
    export let inline = false;
    export let size = '';

    $: link = (branch ? `https://github.com/${repo}/tree/${branch}` : `https://github.com/${repo}`)

    $: elm = (inline? 'span' : 'p');
</script>
<svelte:element this={elm}>
    <a href={link} target="_blank" class="gitlink label {size}">
        <span class="icon github" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
        </span>
            {repo}
        {#if branch}
            <!-- <button class="ui disabled button">#{branch}</button> -->
            <div class="detail">#{branch}</div>
        {/if}
    </a>
</svelte:element>

    <style lang="scss">
        .gitlink.label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.5rem;
            border-radius: 0.35rem;
            background: rgba(0,0,0,0.03);
            color: inherit;
            text-decoration: none;
        }
        .gitlink.label:hover {
            background: rgba(13, 0, 135, 0.128);

        }

        .gitlink.label.github.small {
            padding: 0.15rem 0.35rem;
            font-size: 0.85rem;
        }

        .gitlink.label .icon.github {
            width: 1em;
            height: 1em;
            color: #111827;
            opacity: 0.9;
        }

        svg {
            width: 100%;
            height: 100%;
        }

        .gitlink.label .detail {
            font-size: 0.85rem;
            opacity: 0.65;
            margin-left: 0.4rem;
        }
    </style>