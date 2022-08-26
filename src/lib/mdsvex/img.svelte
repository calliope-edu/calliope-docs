<script>
    // import Image from "svelte-image";
    import { Image } from '@rodneylab/sveltekit-components';
    import { SwiperSlide } from 'swiper/svelte';
    // import exifParser from "fast-exif";
    export let src;
    export let alt = '';
    export let defaultAlt = 'Bild ohne Titel';
    export let figcaption = true;
    if (alt.startsWith('!')) {
        figcaption = false;
        alt = alt.replace('!', '')
    }

    if((alt.startsWith('exif.') || alt === '') && typeof src === 'object' && typeof src.exif === 'object') {
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
</script>

{#if typeof src === 'string'}

    <figure>
        <img {src} {alt} {...$$restProps} />
        <figcaption>{alt}</figcaption>
    </figure>

{:else if typeof src === 'object' && typeof src.meta === 'object'}
    {@const sources = [
        { srcset: src.srcsetJpeg, type: 'image/webp' },
        { srcset: src.srcsetWebp, type: 'image/jpeg' },
    ]}

    {#if src.options.swiper === 'true' }
        <SwiperSlide class="slide">
            <figure>
                <Image {alt} width={(src.meta.width / src.meta.height) * 400 + 'px'} height={'400px'} src={src.meta.src} {sources} maxWidth={'auto'} />
                {#if figcaption}
                    <figcaption>{alt}</figcaption>
                {/if}
            </figure>
        </SwiperSlide>
    {:else}
        <figure>
            <Image {alt} width={src.meta.width} height={src.meta.height} src={src.meta.src} {sources} maxWidth={'auto'} />
            {#if figcaption}
                <figcaption>{alt}</figcaption>
            {/if}
        </figure>
    {/if}

{:else if Array.isArray(src.files)}

    {#each src.files as file}
        {@const newSrc = Object.values(file)[0]}
        <svelte:self src={newSrc} {alt} {figcaption} />
    {/each}

{/if}