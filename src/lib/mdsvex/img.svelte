<script>
    import { Image } from '@rodneylab/sveltekit-components';
    // import { SwiperSlide } from 'swiper/svelte';
    export let src;
    export let alt = null;
    export let defaultAlt = null;
    export let title = '';
    // export let figcaption = true;
    // if (alt.startsWith('!')) {
    //     figcaption = false;
    //     alt = alt.replace('!', '')
    // }
    if (typeof src.meta === 'string') {
        src = src.meta;
    }

    if(alt && (alt.startsWith('exif.') || alt === '') && typeof src === 'object' && typeof src.exif === 'object') {
        switch(alt) {
            case '':
                alt = src.exif?.description || src.exif?.title || defaultAlt;
                break;
            case 'exif.title':
                alt = src.exif?.title || defaultAlt;
                break;
            case 'exif.description':
                alt = src.exif?.description || defaultAlt;
            case 'exif.artist':
                alt = src.exif?.artist || defaultAlt;
            case 'exif.copyright':
                alt = src.exif?.copyright || defaultAlt;
                break;
        }
    }

    if((title.startsWith('exif.')) && typeof src === 'object' && typeof src.exif === 'object') {
        switch(title) {
            case 'exif.title':
                title = src.exif?.title || '';
                break;
            case 'exif.description':
                title = src.exif?.description || '';
            case 'exif.artist':
                title = src.exif?.artist || '';
            case 'exif.copyright':
                title = src.exif?.copyright || '';
                break;
        }
    }
</script>

{#if typeof src === 'string'}

    {#if title}
        <figure>
            <img {src} {alt} {title} {...$$restProps} />
                <figcaption>{title}</figcaption>
        </figure>
    {:else}
        <img {src} {alt} {...$$restProps} />
    {/if}  

{:else if typeof src === 'object' && typeof src.meta === 'object'}

    {@const webpFormat = (src.meta.format.toLowerCase()=='gif') ? 'gif' : 'apng'}
    {@const sources = [
        // { srcset: src.srcsetLegacy, type: `image/${legacyFormat}` },
       // { srcset: src.srcsetAvif, type: 'image/avif' },
        { srcset: src.srcsetWebp, type: `image/${webpFormat}` },
    ]}
    {@const placeholder = src.exif.placeholder}
    {@const dominantColor = src.exif.dominantColor || {r: 200, g: 200, b: 200}}
    {@const svg = `data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
    viewBox='0 0 ${src.meta.width} ${src.meta.height}' style='enable-background:new 0 0 1 1;background-color:rgb(${dominantColor?.r},${dominantColor.g},${dominantColor.b})' xml:space='preserve'>
</svg>`}
    {#if src.options.swiper === 'true' }
        <!-- <SwiperSlide class="slide"> -->
            <figure>
                <Image {alt} placeholder={svg} {title}  width={(src.meta.width / src.meta.height) * 400 + 'px'} height={'400px'} src={src.meta.src} {sources} maxWidth={'auto'} />
                {#if title}
                    <figcaption>{title}</figcaption>
                {/if}
            </figure>
        <!-- </SwiperSlide> -->
    {:else}
        <figure>
            <Image {alt} placeholder={svg} {title}  width={src.meta.width} height={src.meta.height} src={src.meta.src} {sources} maxWidth={'auto'} />
            {#if title}
                <figcaption>{title}</figcaption>
            {/if}
        </figure>
    {/if}

{:else if Array.isArray(src.files)}

    {#each src.files as file}
        {@const newSrc = Object.values(file)[0]}
        <svelte:self src={newSrc} {alt} {title} {...$$restProps} />
    {/each}

{/if}