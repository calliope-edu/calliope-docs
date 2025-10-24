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

<a href={href} bind:this={a} {target} download={downloadName} {rel} hreflang={(isDownload) ? 'en/..' : undefined}>
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
    a {
        text-decoration: none; 

        &:hover {
        text-decoration: underline; 
        opacity: 0.7; 
        }

        .a-container {
            display: inline-flex; 
            align-items: center;
            .icon {
                padding-left: 0.25rem; 
            }
        }
    }
</style>

