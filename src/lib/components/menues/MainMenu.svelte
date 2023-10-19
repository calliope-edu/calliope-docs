
<script>
	import clsx from 'clsx';
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import Button from '$lib/components/elements/Button.svelte';

	export let addBg;
	let menuOpen = false;

	$: active = $page.url.pathname;
	// $: console.log(active);

	let pages = [
		// {url: '/#', name: 'Startseite', sub: []},
		{url: '/docs', name: 'Dokumentation', sub: []},
		// {url: 'https://calliope.cc/', name: 'Calliope.cc', external: true, sub: [
		// 	{url: 'https://calliope.cc/los-geht-s/einfuehrung', name: 'Einführung', external: true, sub: []},
		// 	{url: 'https://calliope.cc/los-geht-s/erste-schritte', name: 'Erste Schritte', external: true, sub: []},
		// 	{url: 'https://calliope.cc/los-geht-s/erste-uebungen', name: 'Erste Übungen', external: true, sub: []},
		// ]},
		// {url: '/idee/', name: 'Idee', sub: []},
		// {url: '/kontakt/', name: 'Kontakt', sub: []},
		
	];
</script>

<div class="block lg:hidden pr-4">
	<button on:click={()=>{menuOpen = !menuOpen;}} aria-expanded={menuOpen} class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none" >
		<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<title>Menu</title>
			<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
		</svg>
	</button>
</div>

<div class:hidden={!menuOpen}
class={clsx('w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 md:bg-transparent z-20', addBg && 'bg-white', !addBg && 'bg-gray-100')}>
	<ul class="list-reset lg:flex justify-end flex-1 items-center">
		{#each pages as {url, name, sub, external = false, expanded = false, hover=false}}
			<li class="mr-3 group" class:active={active.startsWith(url)}
			on:mouseenter={()=>{expanded=true;hover=true}} on:mouseleave={()=>{expanded=false;hover=false}} >
				<svelte:element this="{(sub.length) ? 'button' : 'a'}" target={(external)?'_blank':'_self'} data-sveltekit-prefetch href={url}
				on:click={()=>{
					if(!sub.length){
						active=url;
						menuOpen=false;
					}else{
						if(!hover)
							expanded=!expanded;
					}
				}} class="link inline-block py-2 px-4 no-underline cursor-pointer"
				aria-expanded={expanded}>
					{name}
					{#if sub.length}
						<svg class="fill-current h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
					{/if}
				</svelte:element>
				{#if sub.length && (expanded || !browser)}
					<ul class="dropdown-menu absolute text-gray-700 pt-1 w-min-content shadow-md" transition:fade|global={{duration:100}}>
						{#each sub as p,j}
							<li class:active={active.startsWith(p.url)}>
								<a data-sveltekit-prefetch href={p.url} target={(p.external ?? false)?'_blank':'_self'} on:click={()=>{active=p.url;menuOpen=false;}} class="link {(j===1) ? 'rounded-t' : (j===sub.length) ? 'rounded-b' : ''} bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap w-full">{p.name}</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
		<!-- <li class='mr-5'>
			<Button text='Zum Shop' link='https://shop.calliope.cc' color="calliope-500" />
		</li> -->
	</ul>
</div>

<style lang="scss">

    li.active > .link {
		@apply    text-calliope-500 font-bold;
	}
	li:not(.active) > .link {
		@apply text-gray-600 hover:text-calliope-500 hover:underline;
	}

</style>
    