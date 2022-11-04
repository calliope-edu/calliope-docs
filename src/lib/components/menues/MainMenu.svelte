
<script>
	import clsx from 'clsx';
	import { page } from '$app/stores'

	export let addBg;
	let menuOpen = false;

	$: active = $page.url.pathname;

	let pages = [
		{url: '/los-gehts/einfuehrung/', name: 'Los geht`s', sub: [
			{url: '/los-gehts/einfuehrung/', name: 'Einführung', sub: null},
			{url: '/los-gehts/einfuehrung/', name: 'Erste Schritte', sub: null},
			{url: '/los-gehts/einfuehrung/', name: 'Erste Übungen', sub: null},
		]},
		{url: '/los-gehts/calliope-mini/', name: 'Calliope mini', sub: [
			{url: '/los-gehts/calliope-mini/', name: 'Übersicht', sub: null},
			{url: '/los-gehts/calliope-mini/', name: '25 Porgramme', sub: null},
			{url: '/los-gehts/calliope-mini/', name: 'Technische Daten', sub: null},
			{url: '/los-gehts/calliope-mini/', name: 'Erweiterungen', sub: null},
			{url: '/los-gehts/calliope-mini/', name: 'Shops', sub: null},
		]},
		{url: '/los-gehts/programmieren/', name: 'Programmieren', sub: [
			{url: '/los-gehts/programmieren/', name: 'Editoren', sub: null},
			{url: '/los-gehts/programmieren/', name: 'Mobil', sub: null},
			{url: '/los-gehts/programmieren/', name: 'Grundlagen', sub: null},
			{url: '/los-gehts/programmieren/', name: 'Zu Hause lernen', sub: null},
			{url: '/los-gehts/programmieren/', name: 'Kids Lab', sub: null},
		]},
		{url: '/los-gehts/schulen/', name: 'Schulen', sub: [
			{url: '/los-gehts/schulen/', name: 'Grundschule', sub: null},
			{url: '/los-gehts/schulen/', name: 'Sekundarstufe 1', sub: null},
			{url: '/los-gehts/schulen/', name: 'Schulmaterial', sub: null},
			{url: '/los-gehts/schulen/', name: 'Fortbildungen', sub: null},
			{url: '/los-gehts/schulen/', name: 'Klassensätze', sub: null},
		]},
		{url: '/projekte/', name: 'Projekte', sub: null},
		{url: '/community/', name: 'Community', sub: null},
		{url: '/articles/', name: 'Blog', sub: null},
		{url: '/docs/', name: 'Docs', sub: null},
		
	]
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
		{#each pages as {url, name}}
			<li class="mr-3" class:active={active.startsWith(url)}>
				<a sveltekit:prefetch href={url} on:click={()=>{active='/'}}>{name}</a>
			</li>
		{/each}
	</ul>
</div>

<style type='scss'>

    li.active a {
		@apply inline-block py-2 px-4 text-calliope-500 font-bold no-underline;
	}
	li:not(.active) a {
		@apply inline-block text-gray-600 no-underline hover:text-calliope-500 hover:underline py-2 px-4;
	}

</style>
    