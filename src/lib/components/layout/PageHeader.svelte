<script>
    import clsx from 'clsx';
	import MainMenu from '$lib/components/menues/MainMenu.svelte';
	import { page } from '$app/stores';

    let y = 0;
	$: addBg = y > 10;
</script>

<svelte:window bind:scrollY={y}/>

<nav class={clsx('fixed w-full z-10 top-0', addBg && 'bg-white shadow')}>

    <div class="w-full md:max-w-8xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">

        <div class="pl-4">
            <a class="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl" href="/">
                Calliope
            </a>
        </div>

        <MainMenu {addBg} />

    </div>
</nav>


<style lang="scss">

    header {
        // @apply fixed w-full z-10 top-0;
    }

</style>
