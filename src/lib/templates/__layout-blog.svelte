<script>
	import PageHead from '$lib/components/PageHead.svelte';

	export let meta;

</script>

<PageHead title={meta.title} description={''} />


<main class="prose-base">

	<script>
		export let slug = '';
		export let title;
	
		const id = title
			.toLowerCase()
			.replace(/[^a-zA-Z ]/g, '')
			.replace(/\s/g, '-');
	
		const href = slug ? `/${slug}` : '#' + id;
		const formattedDate = new Date(meta.date).toDateString();
	</script>

		<h2 class="heading" class:large={!slug} {id}>
			<a {href}>
				{meta.title}
			</a>
		</h2>

	
		<p>
			<span class="author">{meta.author}</span>
			<span class="date">{formattedDate}</span>
		</p>
		

	<slot />

</main>


<style>
	h2 {
		margin: 0;
	}

	.heading {
		margin: 0;
		font-size: 1.8rem;
	}

	.large {
		margin-top: calc(var(--spacing-unit) * 12);
		font-size: 2.2rem;
	}


	p {
			margin: 0;
			margin-bottom: calc(var(--spacing-unit) * 4);
		  }
		
			.author {
			font-weight: bold;
				margin-right: calc(var(--spacing-unit) * 2);
			}
		
			.date {
				color: var(--color-text-secondary);
			}
</style>