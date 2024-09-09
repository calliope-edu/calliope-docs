<script>
    // npm i body-scroll-lock
	import BoardVersionSelector from '$lib/components/BoardVersionSelector.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
    import { page } from '$app/stores'
    $: active = $page.url.pathname;
    
    let items = [
        // {
        //     slug: '/tech/',
        //     name: 'Technische Dokumentation',
        // }
        // ,{
        //     slug: '/python/',
        //     name: 'Python Blocks',
        // },
    ]

    let mobileMenuElement;
    let maxWidth = 0;
    let width = 1;
    $: menuWidth = (width > menuWidth) ? width : menuWidth || 1;
    let menuOpen = false;
    $: mobileMenu = ((maxWidth != 0) && (menuWidth > (maxWidth - 300))) ? true : false;

    function toggleMenu() {
        if(menuOpen) {
            enableBodyScroll(mobileMenuElement);
            menuOpen = false;
        } else {
            disableBodyScroll(mobileMenuElement, {reserveScrollBarGap: true});
            menuOpen = true;
        }
    }
</script>

<div bind:clientWidth={maxWidth} class="sizer"></div>

<button on:click={toggleMenu} aria-expanded={menuOpen} tabindex="1" class:none={!mobileMenu}>
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Suche</title>
        <path fill="currentColor" d="M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1l8.05-9.12A8.251 8.251 0 1 0 15.25.01zm0 15a6.75 6.75 0 1 1 0-13.5a6.75 6.75 0 0 1 0 13.5"/>
    </svg> Suche
</button>

<nav class:none={!menuOpen || !mobileMenu} class="mobileMenu" bind:this={mobileMenuElement}>

    <ul style="margin-top:10rem;">
		<li>
			<BoardVersionSelector dropdown />
		</li>
		<li style="width: 100%;">
            {#if mobileMenu}
			    <SearchBar inline />
            {/if}
		</li>
        {#each items as {slug, name}}
        <li>
            <a
            sveltekit:prefetch href="{slug}"
            on:click={()=>{active=slug; toggleMenu();}}
            class:active={active === slug}
            >
                {name}
            </a>
        </li>
        {/each}
    </ul>
</nav>


<nav class:hidden={mobileMenu} class="dekstopMenu" bind:clientWidth={width}>
        <ul>
            {#each items as {slug, name}}
                <li>
                    <a
                    sveltekit:prefetch href="{slug}"
                    on:click={()=>{active=slug}}
                    class:active={active === slug}
                    >
                        {name}
                    </a>
                </li>
            {/each}
        </ul>
        <div class="item">
            {#if !mobileMenu}
                <SearchBar />
            {/if}
        </div>
        <div class="item">
            <BoardVersionSelector dropdown/>
        </div>
</nav>

<style lang='scss'>

    .dekstopMenu {
        display: flex;
    }

    .sizer {
        height: 0px;
        width: 100%;
		position: absolute;
    }
    .none {
        display: none;
        height: 0px;
    }
    .hidden {
        display: none;
    }

    button {
        position: relative;
        z-index: 101;
        margin-left: auto;
        display: flex;
        align-items: center;
        border-radius: 0.25rem; 
        border-width: 1px; 
        border: 1px var(--color-calliope) solid;
        padding: .5rem 1rem;
        background: transparent;
        color: var(--color-calliope);
        font-family: sans-serif;
        font-size: 1rem;
        cursor: pointer;
        transition: background 250ms ease-in-out, 
                    transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;

        &:hover {
            opacity: 0.7;
        }

        &:focus {
            outline: 1px solid #fff;
            outline-offset: -3px;
        }

        svg {
            width: 1.5rem; 
            height: 1rem; 
            margin-right: .5rem;
            fill: currentColor;
        }
    }
    nav {
        width: max-content;
        margin:auto;
        margin-right: 0;
        font-size: 120%;

        ul {
            list-style-type: none;
            display: flex;

            a {
                margin-right: .5em;
                padding: .5em;
                text-decoration: none;
                border: solid rgba(255,255,255,0) 1px;
                transition: color 250ms ease-in-out;

                &:hover, &.active {
                    // color: white;
                    border: solid currentColor 1px;
                }
                &:hover {
                    // background: var(--color-calliope);
                }
                &.active {
                    // background: var(--color-calliope);
                    opacity: 1;
                }
            }
        }
        &.mobileMenu {
            position: fixed;
            z-index: 100;
            background: var(--color-calliope-800);
            transition: background 250ms ease-in-out;
            width: 100%;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            padding-top: var(--headerHeight);
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            // max-height: calc(100vh - var(--headerHeight));
            overflow: auto;

            ul {
                flex-direction: column;
                li {
                    margin: auto;
                    padding: .5em;
                }
            }
        }
    }

    :global(.dark) {

        button {
            color: var(--color-calliope-800);
            border-color: var(--color-calliope-800);
        }

        a {
            color: white;
        }

        .mobileMenu {
            background: var(--color-calliope);
        }
    }

</style>