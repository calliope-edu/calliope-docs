<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';


    import ImageSwiper from '../lib/components/ImageSwiper.svelte';
    import { SwiperSlide } from 'swiper/svelte';


</script>

<Meta 
    title="Elements/ImageSwiper" 
    component={ImageSwiper}
    argTypes={{
        // h: { control: 'number', description: 'Height of ImageSwiper in `rem`' },
    }}
/>


<Template let:args>
    <main>
        <ImageSwiper {...args}>
            <SwiperSlide class="slide">
                <div>A</div>
            </SwiperSlide>
            <SwiperSlide class="slide">
                <div>B</div>
            </SwiperSlide>
            <SwiperSlide class="slide">
                <div>C</div>
            </SwiperSlide>
        </ImageSwiper>
    </main>
</Template>

<Story name="Default"  args={{}} />




<style>
    main {
        width: 70%;
        margin: auto;
    }
    div {
        height: 400px;
        padding: 1rem;
        background: grey;
        background-image: linear-gradient(to bottom right, grey , silver);
        text-align: center;
        color: white;
    }
</style>