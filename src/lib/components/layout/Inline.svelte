<script>
    export let align = 'left';
</script>

<div class="container flex justify-{align} items-center">
	<slot />
</div>

<style>
	.container > h1 {
		margin-bottom: 0px !important;
	}
</style>
