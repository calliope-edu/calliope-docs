<script>
    import { Image } from '@rodneylab/sveltekit-components';
    // import { SwiperSlide } from 'swiper/svelte';
    export let src;
    export let alt = null;
    export let title = '';
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

{/if}