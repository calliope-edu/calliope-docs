<script>
    import IconExternalLink from '~icons/ri/external-link-line'
    // import IconExternalLink from '~icons/ri/external-link-line'
    // import IconDownloadLink from '~icons/ri/download-cloud-2-line'

    export let text = '';
    export let link = '';
    export let type = 'default'; // default | border
    export let color = 'slate-600'; // grey | calliope | ...
    export let download = false; // set download name

    let a = false;
    $: linkParts = link.split('/').length;
    $: fileName = link.split('/').pop();
    
    $: downloadName = (download) ? download : ((isDownload) ? fileName : null);
    $: isInternal = (a) ? a?.host == window.location.host : true;
    $: isDownload = (fileName.indexOf('.') > -1) && !(!isInternal && linkParts <= 3) ? true : false;
    $: target = (isInternal) ? null : '_blank';
    
</script>
<a href={link} bind:this={a} {target} download={downloadName} class='inline-block box-border mx-1 text-center py-1 px-6 rounded-full uppercase no-underline border border-4 border-{color} hover:opacity-70
    {type == 'default' ? 
        `text-white bg-${color}` : 
        `text-${color} bg-white hover:text-white hover:bg-${color}`
    }'>
    <div class="flex items-center"> 
        {text}
        {#if !isInternal}
            <div class="pl-3">
                <!-- <IconExternalLink /> -->
            </div>
        {/if}
        {#if isDownload}
            <div class="pl-3">
                <!-- <IconDownloadLink /> -->
            </div>
        {/if}
    </div>
</a>

