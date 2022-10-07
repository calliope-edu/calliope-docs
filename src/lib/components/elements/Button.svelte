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
    $: iconCount = (!isInternal ? 1 : 0) + (isDownload ? 1 : 0);
    
</script>
<a href={link} bind:this={a} {target} download={downloadName} class='group icons-{iconCount} inline-block box-border mx-1 text-center {roundedClass} uppercase no-underline border border-4 border-{color} hover:opacity-70 font-bold
    {color != 'regenbogen' ? 
        type == 'default' ? 
            `text-white bg-${color}` : 
            `text-${color} bg-white hover:text-white hover:bg-${color} `
    :
        type == 'default' ? 
            `text-white rainbow rainbow-fill` : 
            `rainbow rainbow-border bg-white hover:text-white hover:bg-${color}`
    }'>
    <div class="flex items-center py-1 px-6">
            <span class="{(color=='regenbogen' && type=='border') ? 'text-transparent group-hover:text-white bg-clip-text rainbow-text' : ''}">
                {text}
                <slot />
            </span>
            
            {#if !isInternal}
                <div class="pl-3 icon">
                    <IconExternalLink />
                </div>
            {/if}
            {#if isDownload}
                <div class="pl-3 icon">
                    <IconDownloadLink />
                </div>
            {/if}
    </div>
</a>

<style>


.rainbow-text {
  background-image: linear-gradient(315deg, #F7C425 0%, #E6007E 30%, #6476FD 60%, #3FC863 110%);
}
.icons-1 .rainbow-text {
  background-image: linear-gradient(315deg, #E6007E 0%, #6476FD 50%, #3FC863 110%);
}

.icons-2 .rainbow-text {
  background-image: linear-gradient(315deg, #6476FD 0%, #3FC863 110%);
}

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
  background-image: linear-gradient(transparent, transparent), 
    linear-gradient(315deg, #F7C425 10%, #E6007E 30%, #6476FD 60%, #3FC863 95%);
}

.rainbow-border .icon:last-child {
    color: #F7C425;
}

.rainbow-border .icon:nth-last-child(2) {
    color: #E6007E;
}

.rainbow-border:hover .icon {
    color: white;
}



/* .rainbow {
  background-image: linear-gradient(transparent, transparent), 
    linear-gradient(315deg,#833ab4,#fd1d1d 50%,#fcb045);
  background-origin: border-box;
  background-clip: content-box, border-box;
  @apply border-transparent;
} */

</style>