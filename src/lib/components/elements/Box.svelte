<script>
	export let border = false;
	export let color = 'grau';
	export let rounded = false;
</script>

<div class:border class:rounded style="--color: var(--color-{color}" class="w-12 h-12 flex justify-center items-center
{border ? `text-${color} border-4 border-${color}` : `text-white bg-${color}`}
{rounded ? `rounded-full` : `rounded-lg`}
">
<slot />
</div>

<style lang="scss">
	div {
		display: flex; 
		justify-content: center; 
		align-items: center; 
		width: 3rem; 
		height: 3rem; 
		color: #ffffff;
		background: var(--color);
		border-radius: 0.5rem; 

		&.border {
			color: var(--color);
			border: 4px solid var(--color);
			background: transparent;
		}

		&.rounded {
			border-radius: 9999px; 
		}
	}
</style>
