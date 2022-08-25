
<script>
	import { page } from '$app/stores'

	let menuOpen = false;

	$: active = $page.url.pathname;

</script>

<nav>

	<div class="burger-container mobile {menuOpen}" on:click={()=>{menuOpen = !menuOpen;}}>
		<div id="burger">
			<div class="bar topBar"></div>
			<div class="bar btmBar"></div>
		</div>
	</div>

	<div class='menu {menuOpen}'  on:click={()=>{menuOpen = false;}}>
		<ul>
			<li class:active={active === '/'}><a sveltekit:prefetch href="/" on:click={()=>{active='/'}}>Home</a></li>
			<li class:active={active.startsWith('/articles/')}><a sveltekit:prefetch href="/articles/" on:click={()=>{active='/articles/'}}>Articles</a></li>
			<li class:active={active.startsWith('/docs/')}><a sveltekit:prefetch href="/docs/" on:click={()=>{active='/docs/'}}>Docs</a></li>
		</ul>
	</div>

	<div class=dimmer></div>

</nav>




<style type='scss'>
   
   .menu ul {
    display: flex;
    list-style-type: none;
    margin: 10px -10px;
    padding: 0;
    justify-content: center;
	
    
    li {

		border-bottom: 2px solid transparent;
        
        a {
            padding: 10px;
        }

        &.active {
			border-color:currentColor;
        }
    }
   }
    
</style>
    