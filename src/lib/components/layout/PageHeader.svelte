<script>
    import MainMenu from '$lib/components/menues/MainMenu.svelte';
    import LocaleSwitch from '$lib/components/LocaleSwitch.svelte';
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

    <div class="header-inner container">

        <div class="brand item">
            <a data-sveltekit-prefetch href="/tech/">
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
        <div class="header-right">
            <MainMenu />
        </div>

    </div>
</div>
 


<style lang="scss">
    .header {
        position: sticky;
        top: 0;
        z-index: 100;
        padding: .25rem 0;
        padding-top: 3rem;
        margin-bottom: 0rem;
        background-color: #fff;
        transition: margin 200ms, padding 300ms;

        &.isScrolled {
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding-top: .25rem;
            margin-bottom: 3rem;
        }
    }

    .header-inner {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    .brand {
        display: flex;
        align-items: center;
    }

    .header-right {
        margin-left: auto;
        display: flex;
        align-items: center;
    }
</style>
