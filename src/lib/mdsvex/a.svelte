<script>
    import { browser } from '$app/environment';
    import IconExternalLink from '~icons/ri/external-link-line'
    import IconDownloadLink from '~icons/ri/download-cloud-2-line'
    import IconEmailLink from '~icons/ri/mail-line'

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

<a href={href} bind:this={a} {target} download={downloadName} {rel}
class='no-underline hover:opacity-70 hover:underline'>
    <div class="inline-flex items-center">
        
        <slot />
        {#if isMailto}
            <div class="pl-1">
                <IconEmailLink />
            </div>
        {:else}
            {#if !isInternal}
                <div class="pl-1">
                    <IconExternalLink />
                </div>
            {/if}
            {#if isDownload}
                <div class="pl-1">
                    <IconDownloadLink />
                </div>
            {/if}
        {/if}
    </div>
</a>

