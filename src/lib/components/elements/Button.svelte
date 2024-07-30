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

<a style="--color: var(--color-{color});"
class:default={type=='default'} class:border={type=='border'} class:rainbow={color=="regenbogen"}
href={link} bind:this={a} {target} download={downloadName} rel={relExternal} class='button-container icons-{iconCount} {roundedClass}'>
    <div class="container">
            <span class="text">
                <slot>
                  {text}
                </slot>
            </span>
            
            {#if !isInternal}
                <div class="icon">
                    <IconExternalLink />
                </div>
            {/if}
            {#if isDownload}
                <div class="icon">
                    <IconDownloadLink />
                </div>
            {/if}
    </div>
</a>

<style lang="scss">

/* Calliope */
.button-container {
  cursor: pointer;
  box-sizing: border-box; 
  display: inline-block; 
  // margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-bottom: 0.5rem; 
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; 
  font-weight: 700; 
  text-align: center; 
  text-decoration: none; 
  text-transform: uppercase;
  border: 4px solid var(--color);
  border-radius: 9999px; 

  &.default {
    background-color: var(--color);
    color: #FFF;
    &:hover {
      opacity: 0.7; 
    }
  }

  &.border {
    background-color: #FFF;
    color: var(--color);
    &:hover {
      background-color: var(--color);
      color: #FFF;
    }
  }

  .container {
    display: flex; 
    padding-top: 0.25rem;
    padding-bottom: 0.25rem; 
    padding-left: 1.5rem;
    padding-right: 1.5rem; 
    align-items: center;

    .icon {
      padding-left: 0.75rem;
      display: flex;
    }
  }
}


.rainbow {

  color: #ffffff;
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-color: transparent;

  &.default {
    background-image: linear-gradient(transparent, transparent), 
    linear-gradient(315deg, #F7C425 10%, #E6007E 30%, #6476FD 60%, #3FC863 95%);
  }

  &.border {
    background-color: #ffffff;
    background-image: linear-gradient(white, white), 
    linear-gradient(315deg, #F7C425 10%, #E6007E 30%, #6476FD 60%, #3FC863 95%);

    .icon:last-child {
        color: #F7C425;
    }

    .icon:nth-last-child(2) {
        color: #E6007E;
    }

    &:hover {
      color: #ffffff;
      background-image: linear-gradient(transparent, transparent), 
      linear-gradient(315deg, #F7C425 10%, #E6007E 30%, #6476FD 60%, #3FC863 95%);

      .icon {
          color: white;
      }
    }

    .text {
      background-image: linear-gradient(315deg, #F7C425 0%, #E6007E 30%, #6476FD 60%, #3FC863 110%);
      color: transparent; 
      background-clip: text; 
    }

    &.icons-1 .text {
      background-image: linear-gradient(315deg, #E6007E 0%, #6476FD 50%, #3FC863 110%);
    }
    &.icons-2 .text {
      background-image: linear-gradient(315deg, #6476FD 0%, #3FC863 110%);
    }
  }
}

</style>