<script>
    import clsx from 'clsx';
	import MainMenu from '$lib/components/menues/MainMenu.svelte';
    import BoardVersionSelector from '$lib/components/BoardVersionSelector.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';

    let y = 0;
	$: addBg = y > 10;
</script>

<svelte:window bind:scrollY={y}/>

<nav class={clsx('mb-10 fixed w-full z-30 top-0 bg-white lg:bg-transparent', addBg && 'lg:bg-white shadow')}>

    <div class="w-full md:max-w-8xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">

        <div class="pl-4">
            <a data-sveltekit-prefetch class="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl" href="/docs">
               <img src="/Logo_Calliope_lang.svg" style="height: 2.5rem;" alt="Calliope Logo" />
            </a>
        </div>

        <div>
            <BoardVersionSelector />
        </div>

        <div>
            <SearchBar />
        </div>

        <MainMenu {addBg} />

    </div>
</nav>


<style lang="scss">

a {
    display: flex;
    align-items: center;

    img {
        padding-right: 1rem;
    }
}

</style>
