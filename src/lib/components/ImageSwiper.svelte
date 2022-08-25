<script>
    import { onMount } from 'svelte';
    // Import Swiper Svelte components
    import { fade } from 'svelte/transition';
    import { Swiper } from 'swiper/svelte';
    // import {send, receive} from '../crossfade.js';
    // import { ScaleOut } from 'svelte-loading-spinners';

    // Import Swiper styles
    // import 'swiper/swiper.scss';
    import 'swiper/css'

    let swiperHandle = null;

</script>

<div class='wrapper'>
    <div class='wrapper-inner'>
        <Swiper
        spaceBetween={0}
        slidesPerView={1}
        grabCursor={"true"}
        observer={true}
        centeredSlides={true}
        loop={true}
        on:swiper={(e) => swiperHandle = e.detail[0]}
        >
        <slot />
        </Swiper>
        <!-- <button on:click={() => swiperHandle.slideTo(0)}>Anfang</button> -->
    </div>

    <button class='next' on:click={() => {
        // if(swiperHandle.isEnd) {
        //     swiperHandle.slideTo(0)
        // } else {
            swiperHandle.slideNext();
        // }
    }}>></button>
</div>

<style>

    .wrapper {
        position: relative;
        /* overflow:hidden; */
        background: white;
    }
    .wrapper-inner {
        /* max-width: 56rem;
        padding: 0 2em;
        margin: auto; */
        overflow:hidden;
        /* margin: 2rem; */
        height: 400px;
        max-height: 30vw;
    }

    .wrapper :global(figure) {
        margin: 0;
        margin: auto;
        max-width: 100%;
    }

    .wrapper :global(img) {
        max-width: 100vw;
        height: auto;
    }

    button.next {
        position: absolute;
        z-index: 2;
        height: 400px;
        top: 0;
        right: -120px;
        border: none;
        width: 100px;
        background: none;
        color: grey;
        font-size: 6rem;
        font-weight: bold;
        cursor: pointer;
        /* background-image: linear-gradient(90deg, transparent, white); */
    }
    button.next:hover {
        /* background: rgba(0,0,0,.2); */
    }
    .wrapper figure {
        cursor: zoom-in;
    }

     .wrapper :global(.slide figure) {
        width: min-content;
     }

     .wrapper :global(.swiper) {
        overflow: visible;
    }

    .wrapper :global(.swiper-slide) {
        width: auto;
    }

    .wrapper :global(.swiper figure img) {
       /* max-width: inherit; */
       max-height: 400px;
       max-width: fit-content;
       max-width: -webkit-fill-available;
    }

  </style>
