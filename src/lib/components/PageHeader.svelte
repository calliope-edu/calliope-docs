<script>
	import MainMenu from '$lib/components/menues/MainMenu.svelte';
	import { page } from '$app/stores';
  
</script>

<header>
		<a href="/">
			Page Title
		</a>

	<MainMenu />
</header>


<style lang="scss">

    header {
        position: relative;
        background-color: var(--color-grey);
        
        height: auto;
        min-height: 60px;
        margin-bottom: 3em;

        *,a {
            color: var(--primary-inverse);
        }
    }

</style>
