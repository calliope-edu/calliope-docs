<script>
	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';

	export let meta;
</script>

<main>
	
	<PageHead title={meta.title} description={meta.description} />

	<ArticleTitle title={meta.title} />
	<ArticleMeta author={meta.author} date={meta.date} />

	<slot />

</main>
