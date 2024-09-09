<script>
    import MainMenu from '$lib/components/menues/MainMenu.svelte';
    // import LocaleSwitch from '$lib/components/LocaleSwitch.svelte';
    // import BoardVersionSelector from '$lib/components/BoardVersionSelector.svelte';
    // import SearchBar from '$lib/components/SearchBar.svelte';

    let y = 0;
	$: isScrolled = y > 10;
</script>

<svelte:window bind:scrollY={y}/>

<!-- <div style="position: absolute; top:0; right: 0; z-index:999;">
	<LocaleSwitch />
</div> -->

<div class="header" class:isScrolled>

    <div class="ui wide container secondary menu">

        <div class="item">
            <a data-sveltekit-prefetch href="/tech">
                <img src="/Logo_Calliope_lang.svg" style="height: 2.5rem;" alt="Calliope Logo" />
            </a>
        </div>

        <!-- <div class="right menu">
            <div class="item">
                <SearchBar />
            </div>
            <div class="item">
                <BoardVersionSelector dropdown/>
            </div>
        </div> -->
        <div class="ui secondary fluid right menu" style="align-items: center;">
            <MainMenu />
        </div>

    </div>
</div>
 


<style lang="scss">
    .header {
        position: sticky;
        top: 0;
        z-index: 100;
        padding: 0.5rem 0;
        padding-top: 3rem;
        background-color: #fff;

        &.isScrolled {
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding-top: 0rem;
        }
    }
</style>
