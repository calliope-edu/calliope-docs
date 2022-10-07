<script>
    import IconExternalLink from '~icons/ri/external-link-line'
    import IconDownloadLink from '~icons/ri/download-cloud-2-line'

    export let text = '';
    export let link = '';
    export let type = 'default'; // default | border
    export let color = 'grau'; // grey | calliope | ...
    export let download = false; // set download name
    export let rounded = 'full'
    $: roundedClass = (rounded == '' || rounded == 'rounded') ? 'rounded' : `rounded-${rounded}`;

    let a = false;
    $: linkParts = link.split('/').length;
    $: fileName = link.split('/').pop();
    
    $: downloadName = (download) ? download : ((isDownload) ? fileName : null);
    $: isInternal = (a) ? a?.host == window.location.host : true;
    $: isDownload = (fileName.indexOf('.') > -1) && !(!isInternal && linkParts <= 3) ? true : false;
    $: target = (isInternal) ? null : '_blank';
    
</script>
<a href={link} bind:this={a} {target} download={downloadName} class='inline-block box-border mx-1 text-center {roundedClass} uppercase no-underline border border-4 border-{color} hover:opacity-70
    {color != 'regenbogen' ? 
        type == 'default' ? 
            `text-white bg-${color}` : 
            `text-${color} bg-white hover:text-white hover:bg-${color}`
    :
        type == 'default' ? 
            `text-white rainbow rainbow rainbow-fill` : 
            `rainbow rainbow-border bg-white hover:text-white hover:bg-${color}`
    }'>
    <div class="flex items-center py-1 px-6 "> 
        {text}
        <slot />
        {#if !isInternal}
            <div class="pl-3">
                <IconExternalLink />
            </div>
        {/if}
        {#if isDownload}
            <div class="pl-3">
                <IconDownloadLink />
            </div>
        {/if}
    </div>
</a>

<style>
.rainbow {
    background-origin: border-box;
    background-clip: content-box, border-box;
    @apply border-transparent;
}

.rainbow-fill {
  background-image: linear-gradient(transparent, transparent), 
    linear-gradient(315deg, #F7C425 10%, #E6007E 30%, #6476FD 60%, #3FC863 95%);
}
.rainbow-border {
  background-image: linear-gradient(white, white), 
    linear-gradient(315deg, #F7C425 10%, #E6007E 30%, #6476FD 60%, #3FC863 95%);
}

.rainbow-border:hover {
  background-image: linear-gradient(315deg, rgba(255,255,255,.8), rgba(255,255,255,0.05) 70%), 
    linear-gradient(315deg, #F7C425 10%, #E6007E 30%, #6476FD 60%, #3FC863 95%);
}



/* .rainbow {
  background-image: linear-gradient(transparent, transparent), 
    linear-gradient(315deg,#833ab4,#fd1d1d 50%,#fcb045);
  background-origin: border-box;
  background-clip: content-box, border-box;
  @apply border-transparent;
} */

</style>