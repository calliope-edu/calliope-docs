<script>
	export let title;
	export let description;

	const siteTitle = 'Calliope Dokumentation';
	$: formattedTitle = title ? `${title} | ${siteTitle}` : siteTitle;
</script>

<svelte:head>
	<title>{formattedTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>
