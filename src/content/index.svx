---
title: "About this Blog"
description: "..."
template: 
published: true
---

<script>
	import PageHead from '$lib/components/PageHead.svelte';

    export let _subpages = {};
</script>

<PageHead title="Start" description="Blog Playground" />

<a href='/articles'>&rarr; Got to Page where I played with templates and components</a>


Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

<a href='/about'>Read More &rarr;</a>

---

{#if typeof _subpages.articles != 'undefined'}
	{#each _subpages.articles as { slug, title, author, description, date, image }}
		<article>
				<div class='articleImage'>
					{#if (image ?? null) != null}
						<img src={image} alt={title} />
					{/if}
				</div>
				<div>
					<a href={`/${slug}`}>
						{title}
					</a>
					{description}
					{#if slug}
						<a href={`/${slug}`}>Read More &rarr;</a>
					{/if}
				</div>
		</article>
	{/each}
{/if}

<hr>

{#if typeof _subpages.people != 'undefined'}
	{#each _subpages.people as { slug, title, author, description, date, image }}
		<article>
			<div class='articleImage'>
				{#if (image ?? null) != null}
						<img src={image} alt={title} />
				{/if}
			</div>
			<div>
				Interview
				<a href={`/${slug}`}>
					{title}
				</a>
				{description}
				{#if slug}
					<a href={`/${slug}`} class="font-bold hover:text-indigo-600">Read More &rarr;</a>
				{/if}
			</div>
		</article>
	{/each}
{/if}



<style>
	.articleImage {
		width: 100px;
		/* float: left; */
		margin-right: 1em;
	}

	article {
		display: flex;
		width: 100%;
		height: max-content;
		margin: 10px 0;
	}
	hr {
		width: 100%;
		display: block;
	}
</style>
