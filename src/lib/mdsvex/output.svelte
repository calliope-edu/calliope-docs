<script>
    import Typewriter from 'svelte-typewriter'
    import Gap from '$lib/components/Gap.svelte'
    import ImageSwiper from '$lib/components/ImageSwiper.svelte';
    import Admonition from '$lib/components/Admonition.svelte';

    let classes = $$restProps.class ?? ''
    let [output, ...options] = classes?.split(" ") ?? ['', []];
    output = output.toLowerCase();

    // console.log(options)

    function throwError(e){
        console.error(`Output '${e}' not found!`);
        throw new Error(`Output '${e}' not found!`);
    }
</script>

{#if output === 'typewriter'}
    <Typewriter {...$$restProps}>
        <slot />
    </Typewriter>
{:else if output === 'gap'}
    <Gap h={options[0]} />
{:else if output === 'swiper'}
    <ImageSwiper>
        <slot />
    </ImageSwiper>
{:else if output === 'admonition'}
    <Admonition {options}>
        <slot />
    </Admonition>
{:else}
    {throwError(output)}
    <div class='no-output-found'>
        <slot />
    </div>
{/if}

<style>
    .no-output-found {
        background: red;
    }
</style>