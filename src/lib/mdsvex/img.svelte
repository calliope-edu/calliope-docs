<script>
    export let src;
    export let alt = null;
    export let defaultAlt = null;
    export let title = '';
    export let usePhotoSwipe = true;
    import { onMount } from "svelte";
    import PhotoSwipeLightbox from 'photoswipe/lightbox';
    import PhotoSwipe from 'photoswipe';
    import 'photoswipe/style.css';

    const srcType = (typeof src === 'string') ? 'img' : 
                    (typeof src === 'object' && src.enhanced) ? 'enhanced' : 
                    (typeof src === 'object' && Array.isArray(src.files)) ? 'images' : 
                    null;

    if(srcType === 'img') {
        usePhotoSwipe = false;
    }

    let galleryElement;

    onMount(() => {
        if (usePhotoSwipe) {
            let lightbox = new PhotoSwipeLightbox({
            gallery: galleryElement,
            children: 'a',
            pswpModule: PhotoSwipe
            });
            lightbox.init();
        }
    })

    // Handle alt text from EXIF metadata or defaults
    if (alt?.startsWith('exif.') || alt === '') {
        if (typeof src === 'object' && typeof src.exif === 'object') {
            switch (alt) {
                case '':
                    alt = src.exif?.description || src.exif?.title || defaultAlt;
                    break;
                case 'exif.title':
                    alt = src.exif?.title || defaultAlt;
                    break;
                case 'exif.description':
                    alt = src.exif?.description || defaultAlt;
                    break;
                case 'exif.artist':
                    alt = src.exif?.artist || defaultAlt;
                    break;
                case 'exif.copyright':
                    alt = src.exif?.copyright || defaultAlt;
                    break;
            }
        }
    }

    // Handle title from EXIF metadata
    if (title?.startsWith('exif.')) {
        if (typeof src === 'object' && typeof src.exif === 'object') {
            switch (title) {
                case 'exif.title':
                    title = src.exif?.title || '';
                    break;
                case 'exif.description':
                    title = src.exif?.description || '';
                    break;
                case 'exif.artist':
                    title = src.exif?.artist || '';
                    break;
                case 'exif.copyright':
                    title = src.exif?.copyright || '';
                    break;
            }
        }
    }
</script>
<span class="image-container" class:pswp-gallery={usePhotoSwipe} bind:this={galleryElement} class:galerie={srcType === 'images'}>

    {#if srcType === 'images'}
            
            <!-- Handle arrays of images -->
            {#each src.files as file}
                {#each Object.keys(file) as key}
                    <svelte:self src={file[key]} alt={alt} title={title} usePhotoSwipe={false} />
                {/each}
            {/each}
    {:else if srcType === 'enhanced'}
            {#if src && src.enhanced && src.enhanced.img}
            <span class="image" style="--img-width: {src.enhanced.img.w}px; --img-height: {src.enhanced.img.h}px;">
                <!-- Use the enhanced image -->
                {#if src.enhanced && src.enhanced.img}
                    <a
                        href={src.enhanced.img.src}
                        data-pswp-width={src.enhanced.img.w}
                        data-pswp-height={src.enhanced.img.h}
                        target="_blank"
                        rel="noreferrer"
                        hreflang="en/.."
                        aria-label="Open image"
                    >
                        <enhanced:img src={src.enhanced} alt={alt} title={title} />
                    </a>
                {:else}
                    <enhanced:img src={src.enhanced} alt={alt} title={title} />
                {/if}
            </span>
            {:else}
                <!-- check if image is svg, like {"enhanced":"/src/content/produkte/%5B...01%5Dmotionkit2/%5B...01%5Duebersicht/motionkit2_inhalt.svg?w=1456;606;364;303;182&enhanced","meta":"/src/content/produkte/%5B...01%5Dmotionkit2/%5B...01%5Duebersicht/motionkit2_inhalt.svg?&metadata","exif":{"width":728,"height":"auto","title":"motionkit2_inhalt","url":"./motionkit2_inhalt.svg","description":"","artist":"","copyright":""},"options":{}} and if url ends with svg ignore enahnced image and render by url
 -->
                {#if src && src.exif && src.exif.url && typeof src.exif.url === 'string' && src.exif.url.endsWith('.svg')}
                    <img src={src.exif.url} alt={alt} title={title} />
                {:else}
                    Fehler beim laden des Bildes: {JSON.stringify(src)}
                {/if}
            {/if}
        
    <!-- {:else if srcType === 'img'}
        <img src={src} alt={alt} title={title} /> -->
    {/if}
</span>
<style lang="scss">

.image-container {
    display: flex;
    background-color: #fafafa;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid #eee;
}
span.image {
    display: inline-block; /* Shrink-wrap to image’s natural size */
    max-width: 100%; /* Never exceed container’s width */
    max-height: min(40vh, 500px, 100%); /* Cap height at 40vh or container’s height */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    line-height: 0; /* Remove spacing under image */
    margin: auto;

    :global(img) {
        max-width: min(100%, var(--img-width)); /* Never scale beyond natural size */
        max-height: min(40vh, 500px, var(--img-height)); 
        width: auto; /* Use natural width */
        height: auto; /* Use natural height */
        display: block; 
    }

} 

</style>
