
<script>
	import clsx from 'clsx';
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition';

	export let addBg;
	let menuOpen = false;

	$: active = $page.url.pathname;

	let pages = [
		{url: '/los-gehts/', name: 'Los geht`s', sub: [
			{url: '/los-gehts/einfuehrung/', name: 'Einführung', sub: []},
			{url: '/los-gehts/erste-schritte/', name: 'Erste Schritte', sub: []},
			{url: '/los-gehts/erste-uebungen/', name: 'Erste Übungen', sub: []},
		]},
		{url: '/los-gehts/calliope-mini/', name: 'Calliope mini', sub: [
			{url: '/los-gehts/calliope-mini/', name: 'Übersicht', sub: []},
			{url: '/los-gehts/calliope-mini/', name: '25 Porgramme', sub: []},
			{url: '/los-gehts/calliope-mini/', name: 'Technische Daten', sub: []},
			{url: '/los-gehts/calliope-mini/', name: 'Erweiterungen', sub: []},
			{url: '/los-gehts/calliope-mini/', name: 'Shops', sub: []},
		]},
		{url: '/los-gehts/programmieren/', name: 'Programmieren', sub: [
			{url: '/los-gehts/programmieren/', name: 'Editoren', sub: []},
			{url: '/los-gehts/programmieren/', name: 'Mobil', sub: []},
			{url: '/los-gehts/programmieren/', name: 'Grundlagen', sub: []},
			{url: '/los-gehts/programmieren/', name: 'Zu Hause lernen', sub: []},
			{url: '/los-gehts/programmieren/', name: 'Kids Lab', sub: []},
		]},
		{url: '/los-gehts/schulen/', name: 'Schulen', sub: [
			{url: '/los-gehts/schulen/', name: 'Grundschule', sub: []},
			{url: '/los-gehts/schulen/', name: 'Sekundarstufe 1', sub: []},
			{url: '/los-gehts/schulen/', name: 'Schulmaterial', sub: []},
			{url: '/los-gehts/schulen/', name: 'Fortbildungen', sub: []},
			{url: '/los-gehts/schulen/', name: 'Klassensätze', sub: []},
		]},
		{url: '/projekte/', name: 'Projekte', sub: []},
		{url: '/community/', name: 'Community', sub: []},
		{url: '/articles/', name: 'Blog', sub: []},
		{url: '/docs/', name: 'Docs', sub: []},
	];
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
		{#each pages as {url, name, sub, subHover = false}}
			<li class="mr-3 group" class:active={active.startsWith(url)}
			on:mouseenter={()=>{subHover=true}} on:mouseleave={()=>{subHover=false}} >
				<svelte:element this="{(sub.length) ? 'button' : 'a'}" tabindex="0" sveltekit:prefetch href={url} on:click={()=>{if(!sub.length) active=url;}} class="link inline-block py-2 px-4 no-underline cursor-pointer" on:focus={()=>{subHover=true}} on:blur={()=>{subHover=false}}>
					{name}
					{#if sub.length}
						<svg class="fill-current h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
					{/if}
				</svelte:element>
				{#if (sub.length && subHover) || !$page.url.pathname}
					<!-- <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 w-min-content group-hover:block shadow-md"> -->
					<ul class="dropdown-menu absolute text-gray-700 pt-1 w-min-content shadow-md" transition:fade={{duration:100}}>
						{#each sub as p,j}
							<li class:active={active.startsWith(p.url)}>
								<a sveltekit:prefetch href={p.url} on:click={()=>{active=p.url}} tabindex="0" class="link {(j===1) ? 'rounded-t' : (j===sub.length) ? 'rounded-b' : ''} bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap w-full" on:focus={()=>{subHover=true}} on:blur={()=>{subHover=false}}>{p.name}</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style type='scss'>

    li.active > .link {
		@apply    text-calliope-500 font-bold;
	}
	li:not(.active) > .link {
		@apply text-gray-600 hover:text-calliope-500 hover:underline;
	}

</style>
    