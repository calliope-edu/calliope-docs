
<script>
	import clsx from 'clsx';
	import { page } from '$app/stores'

	export let addBg;
	let menuOpen = false;

	$: active = $page.url.pathname;

</script>

<div class="block lg:hidden pr-4">
	<button on:click={()=>{menuOpen = !menuOpen;}} class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none">
		<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<title>Menu</title>
			<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
		</svg>
	</button>
</div>

<div class:hidden={!menuOpen}
class={clsx('w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 md:bg-transparent z-20', addBg && 'bg-white', !addBg && 'bg-gray-100')}>
	<ul class="list-reset lg:flex justify-end flex-1 items-center" on:click={()=>{menuOpen = false;}}>
		<li class="mr-3" class:active={active === '/'}>
			<a sveltekit:prefetch href="/" on:click={()=>{active='/'}}>Home</a>
		</li>
		<li class="mr-3" class:active={active.startsWith('/articles/')}>
			<a sveltekit:prefetch href="/articles/" on:click={()=>{active='/articles/'}}>Articles</a>
		</li>
		<li class="mr-3" class:active={active.startsWith('/docs/')}>
			<a sveltekit:prefetch href="/docs/" on:click={()=>{active='/docs/'}}>Docs</a>
		</li>
	</ul>
</div>

<style type='scss'>

    li.active a {
		@apply inline-block py-2 px-4 text-gray-900 font-bold no-underline;
	}
	li:not(.active) a {
		@apply inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-2 px-4;
	}

</style>
    