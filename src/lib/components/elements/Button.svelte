<script>
    import IconExternalLink from '~icons/ri/external-link-line'
    import IconDownloadLink from '~icons/ri/download-cloud-2-line'

    export let text = ''; //
    export let link = undefined;
    export let type = 'default'; // default | border
    export let color = 'grau';
    export let download = false; // set download name
    export let rounded = 'full';
    $: roundedClass = (rounded == '' || rounded == 'rounded') ? 'rounded' : `rounded-${rounded}`;

    let a = false;
    $: linkParts = link?.split('/').length ?? 0;
    $: fileName = link?.split('/').pop() ?? '';
    
    $: downloadName = (download) ? download : ((isDownload) ? fileName : null);
    $: isInternal = (a) ? a?.host == window.location.host : (link?.startsWith('http')) ? false : true;
    $: isDownload = (fileName.indexOf('.') > -1) && !(!isInternal && linkParts <= 3) ? true : false;
    $: target = (isInternal) ? null : '_blank';
    $: iconCount = (!isInternal ? 1 : 0) + (isDownload ? 1 : 0);
    $: relExternal = (isDownload || !isInternal) ? 'external' : undefined;
    
</script>
<a href={link} bind:this={a} {target} download={downloadName} rel={relExternal} class='group icons-{iconCount} font-mono inline-block box-border mx-1 text-center {roundedClass} uppercase no-underline border border-4 border-{color} hover:opacity-70 font-bold
    {color != 'regenbogen' ? 
        type == 'default' ? 
            `text-white bg-${color}` : 
            `text-${color} bg-white hover:text-white hover:bg-${color}`
    :
        type == 'default' ? 
            `text-white rainbow rainbow-fill` : 
            `rainbow rainbow-border bg-white hover:text-white`
    }'>
    <div class="flex items-center py-1 px-6">
            <span class="{(color=='regenbogen' && type=='border') ? 'text-transparent group-hover:text-white bg-clip-text rainbow-text' : ''}">
                <slot>
                  {text}
                </slot>
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

<style lang="scss">
a {
  text-transform: uppercase;
}

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



/* Calliope */
.bg-calliope {
  background-color: var(--color-calliope);
  /* Add more styling as needed */
}

/* Rosa */
.bg-rosa {
  background-color: var(--color-rosa);
  /* Add more styling as needed */
}

/* Blau */
.bg-blau {
  background-color: var(--color-blau);
  /* Add more styling as needed */
}

/* Gruen */
.bg-gruen {
  background-color: var(--color-gruen);
  /* Add more styling as needed */
}

/* Lila */
.bg-lila {
  background-color: var(--color-lila);
  /* Add more styling as needed */
}

/* Gelb */
.bg-gelb {
  background-color: var(--color-gelb);
  /* Add more styling as needed */
}

/* Apricot */
.bg-apricot {
  background-color: var(--color-apricot);
  /* Add more styling as needed */
}

/* Grau */
.bg-grau {
  background-color: var(--color-grau);
  /* Add more styling as needed */
}





/* Calliope */
.border-calliope {
  border-color: var(--color-calliope);
  /* Add more styling as needed */
}

/* Rosa */
.border-rosa {
  border-color: var(--color-rosa);
  /* Add more styling as needed */
}

/* Blau */
.border-blau {
  border-color: var(--color-blau);
  /* Add more styling as needed */
}

/* Gruen */
.border-gruen {
  border-color: var(--color-gruen);
  /* Add more styling as needed */
}

/* Lila */
.border-lila {
  border-color: var(--color-lila);
  /* Add more styling as needed */
}

/* Gelb */
.border-gelb {
  border-color: var(--color-gelb);
  /* Add more styling as needed */
}

/* Apricot */
.border-apricot {
  border-color: var(--color-apricot);
  /* Add more styling as needed */
}

/* Grau */
.border-grau {
  border-color: var(--color-grau);
  /* Add more styling as needed */
}


</style>