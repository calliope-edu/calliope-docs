<script>
    import * as m from "$lib/paraglide/messages.js"
    import SearchBar from '$lib/components/SearchBar.svelte';
    import LocaleSwitch from '$lib/components/LocaleSwitch.svelte';
    import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
    import { page } from '$app/state';
    import BoardVersionSelector from '$lib/components/BoardVersionSelector.svelte';
    
    let active = page?.params?.slugs ?? '';
    let menuOpen = false;
    let mobileMenuElement;
    
    const items = [
        {
        //     slug: '/',
        //     name: 'Home',
        // },{
        //     slug: '/tech/',
        //     name: 'Technische Dokumentation',
        // },{
        //     slug: '/python/',
        //     name: 'Python Blocks',
        }
    ];

    function toggleMenu() {
        menuOpen = !menuOpen;
        if(menuOpen) {
            disableBodyScroll(mobileMenuElement, {reserveScrollBarGap: true});
        } else {
            enableBodyScroll(mobileMenuElement);
        }
    }

    function closeMenu() {
        menuOpen = false;
        enableBodyScroll(mobileMenuElement);
    }

    // Function to determine the active item
    function isActive(itemSlug, currentPath = '') {
        currentPath = '/'+currentPath;
        if (itemSlug === '/') {
            return itemSlug === currentPath; // Match only the exact '/' route for home
        }
        return (currentPath).startsWith(itemSlug);
    }
</script>

<!-- Mobile menu toggle button -->
<button 
    on:click={toggleMenu} 
    aria-expanded={menuOpen} 
    aria-label="Toggle menu"
    class="menu-toggle"
>
    <div class="hamburger" class:active={menuOpen}>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </div>
    <span class="sr-only">Menu</span>
</button>

<!-- Mobile menu panel -->
{#if menuOpen}
<div class="mobile-menu-backdrop" on:click={closeMenu}></div>
{/if}
<nav class="mobile-menu" class:open={menuOpen} bind:this={mobileMenuElement}>
    <div class="mobile-menu-header">
        <button on:click={closeMenu} class="close-button" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>

    <div class="mobile-menu-content">
        <div class="mobile-board-selector">
            <BoardVersionSelector dropdown />
        </div>
        
        <div class="mobile-search">
            <SearchBar inline />
        </div>

        <ul class="mobile-menu-items">
            {#each items as {slug, name}}
            <li> 
                <a
                    sveltekit:prefetch 
                    href="{slug}"
                    on:click={closeMenu}
                    class:active={isActive(slug, page?.params?.slugs) || active === slug}
                >
                    {name}
                </a>
            </li>
            {/each}
        </ul>
        
        <!-- <div class="mobile-locale-switch">
            <h3 class="locale-heading">Language</h3>
            <LocaleSwitch onSelect={closeMenu} />
        </div> -->
    </div>
</nav>

<!-- Desktop menu -->
<nav class="desktop-menu">
    <ul>
        {#each items as {slug, name}}
            <li>
                <a
                sveltekit:prefetch href="{slug}"
                on:click={()=>{active=slug}}
                class:active={isActive(slug, page?.params?.slugs)}
                >
                    {name}
                </a>
            </li>
        {/each}
    </ul>
    <div class="search-wrapper">
        <SearchBar />
    </div>

    <div class="item">
        <BoardVersionSelector dropdown />
    </div>
</nav>

<style lang='scss'>
    /* Hide screen reader only text visually */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    /* Menu toggle button for mobile */
    .menu-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 10px;
        z-index: 101;
        
        @media (min-width: 992px) {
            display: none;
        }
    }

    /* Hamburger icon */
    .hamburger {
        width: 24px;
        height: 18px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .bar {
            display: block;
            width: 100%;
            height: 2px;
            background-color: var(--color-grau, #333);
            border-radius: 1px;
            transition: all 0.3s ease;
        }
        
        &.active {
            .bar:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .bar:nth-child(2) {
                opacity: 0;
            }
            
            .bar:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    }

    /* Mobile menu */
    .mobile-menu {
        display: block;
        position: fixed;
        top: 0;
        right: -100%;
        width: 85%;
        max-width: 750px;
        height: 100vh;
        background-color: white;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        overflow-y: auto;
        transition: right 0.3s ease;
        padding: 0;
        
        &.open {
            right: 0;
        }
        
        @media (min-width: 992px) {
            display: none;
        }
    }

    /* Backdrop for mobile menu */
    .mobile-menu-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
    
    /* Mobile menu header */
    .mobile-menu-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem 1rem;
        border-bottom: 1px solid #eaeaea;
        background-color: #fafafa;
        min-height: 60px;
    }

    /* Close button */
    .close-button {
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--color-grau, #333);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background-color 0.3s ease;
        min-width: 44px;
        min-height: 44px;
        
        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
        
        &:active {
            background-color: rgba(0, 0, 0, 0.15);
        }
    }
    
    /* Mobile menu content wrapper */
    .mobile-menu-content {
        display: flex;
        flex-direction: column;
        gap: 0;
    }
    
    /* Mobile board selector */
    .mobile-board-selector {
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid #eaeaea;
        background-color: #fafafa;
        
        :global(.ui.menu) {
            margin: 0;
        }
        
        :global(.ui.dropdown) {
            font-size: 1rem;
        }
    }
    
    /* Mobile search */
    .mobile-search {
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid #eaeaea;
        
        :global(.ui.input) {
            width: 100%;
            
            :global(input) {
                width: 100%;
                font-size: 1rem;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                border: 1px solid #ddd;
                
                &:focus {
                    border-color: var(--primary, #0066cc);
                    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
                }
            }
        }
    }
    
    /* Mobile menu items */
    .mobile-menu-items {
        list-style-type: none;
        padding: 0.5rem 0;
        margin: 0;
        
        li {
            display: block;
            width: 100%;
            
            a {
                display: flex;
                align-items: center;
                padding: 1rem 1.5rem;
                color: var(--color-grau, #333);
                text-decoration: none;
                font-size: 1.05rem;
                transition: all 0.2s ease;
                border-left: 3px solid transparent;
                min-height: 48px;
                
                &:hover {
                    background-color: rgba(0, 0, 0, 0.04);
                    border-left-color: rgba(0, 102, 204, 0.3);
                }
                
                &:active {
                    background-color: rgba(0, 0, 0, 0.08);
                }
                
                &.active {
                    background-color: rgba(0, 102, 204, 0.08);
                    border-left-color: var(--primary, #0066cc);
                    font-weight: 600;
                    color: var(--primary, #0066cc);
                }
            }
        }
    }
    
    /* Mobile locale switch */
    .mobile-locale-switch {
        padding: 1.25rem 1.5rem;
        border-top: 1px solid #eaeaea;
        margin-top: auto;
        
        .locale-heading {
            font-size: 0.9rem;
            margin: 0 0 1rem 0;
            font-weight: 600;
            color: var(--color-grau, #666);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    }
    
    /* Desktop menu */
    .desktop-menu {
        display: none;
        align-items: center;
        
        @media (min-width: 992px) {
            display: flex;
        }
        
        ul {
            list-style-type: none;
            display: flex;
            padding: 0;
            margin: 0;
            
            li {
                margin-right: 1.5rem;
                
                &:last-child {
                    margin-right: 0;
                }
                
                a {
                    color: var(--color-grau, #333);
                    text-decoration: none;
                    font-size: 1.2rem;
                    padding: 0.6rem 0;
                    position: relative;
                    transition: all 0.3s ease;
                    
                    &:hover, &.active {
                        color: var(--primary, #0066cc);
                    }
                    
                    &:after {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        bottom: 0;
                        left: 0;
                        background-color: var(--primary, #0066cc);
                        transform: scaleX(0);
                        transform-origin: right;
                        transition: transform 0.3s ease;
                    }
                    
                    &:hover:after, &.active:after {
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                }
            }
        }
        
        .search-wrapper {
            margin-left: 1.5rem;
        }
    }
</style>