<script>
    import BoardVersionSelector from '$lib/components/BoardVersionSelector.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';

    let y = 0;
	$: isScrolled = y > 10;
</script>

<svelte:window bind:scrollY={y}/>

<div class="header" class:isScrolled>
    <div class="ui wide container secondary menu">

        <div class="item">
            <a data-sveltekit-prefetch href="/tech">
                <img src="/Logo_Calliope_lang.svg" style="height: 2.5rem;" alt="Calliope Logo" />
            </a>
        </div>

        <div class="right menu">
            <div class="item">
                <SearchBar />
            </div>
            <div class="item">
                <BoardVersionSelector dropdown/>
            </div>
        </div>
    </div>
</div>
 
<!-- <MainMenu {isScrolled} /> -->

<style lang="scss">
    .header {
        position: sticky;
        top: 0;
        z-index: 100;
        padding: 0.5rem 0;
        background-color: #fff;

        &.isScrolled {
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
    }
</style>
