<script>
    import { browser } from '$app/environment';
    import IconExternalLink from '~icons/ri/external-link-line'
    import IconDownloadLink from '~icons/ri/download-cloud-2-line'
    import IconEmailLink from '~icons/ri/mail-line'
    import { page } from '$app/state';

    export let href = '';
    export let download = false; // set download name

    let a;
    $: fileName = href.split('/').pop();
    $: isMailto = (href.split(':')[0].toLocaleLowerCase() == 'mailto');
    $: isDownload = ((fileName.indexOf('.') > -1) && !['html', 'htm', 'php', 'de', 'com', 'cc', 'org', 'net'].includes(fileName.split('.').pop())) ? true : false;
    $: downloadName = (download) ? download : ((isDownload) ? fileName : null);
    $: isInternal = (browser) ? a?.host == window.location.host : (href.startsWith('http')) ? false : true;
    $: target = (isInternal) ? null : '_blank';
    $: rel = (isInternal) ? null : 'noopener noreferrer';

</script>

<a class={`md-link ${isInternal ? 'internal' : 'external'} ${isDownload ? 'download' : ''} ${isMailto ? 'mailto' : ''}`} href={href} bind:this={a} {target} download={downloadName} {rel} hreflang={(isDownload) ? 'en/..' : undefined}>
    <span class="a-container">
        
        <slot />
        {#if isMailto}
            <span class="icon">
                <IconEmailLink />
            </span>
        {:else}
            {#if !isInternal}
                <span class="icon">
                    <IconExternalLink />
                </span>
            {/if}
            {#if isDownload}
                <span class="icon">
                    <IconDownloadLink />
                </span>
            {/if}
        {/if}
    </span>
</a>

<style lang="scss">
    /* Modern inline link styles for markdown content */
    a.md-link {
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--primary, #3b82f6);
        font-weight: 500;
        padding: 0 0.08rem;
        border-radius: 4px;
        transition: background-color 140ms ease, transform 80ms ease, color 140ms ease;

        &:hover, &:focus {
            background-color: rgba(59, 130, 246, 0.06);
            transform: translateY(-0.5px);
            color: var(--primary, #3b82f6);
            text-decoration: none;
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 4px rgba(59,130,246,0.06);
        }

        /* internal links look slightly more neutral than external ones */
        &.internal { color: var(--headerColor, #111827); font-weight: 500; }
        &.external { color: var(--primary, #3b82f6); }
    }

    a.md-link .a-container {
        display: inline-flex; 
        align-items: center;
    }

    /* small icons and spacing for nicer visual balance */
    a.md-link .icon {
        padding-left: 0.25rem;
        display: inline-flex;
        align-items: center;
        color: rgba(0,0,0,0.6);
    }

    a.md-link .icon :global(svg) {
        width: 14px;
        height: 14px;
        display: block;
    }
</style>

