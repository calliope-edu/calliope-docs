<script>
	export let border = false;
	export let color = 'grau';
	export let rounded = false;
</script>

<div class="w-12 h-12 flex justify-center items-center
{border ? `text-${color} border-4 border-${color}` : `text-white bg-${color}`}
{rounded ? `rounded-full` : `rounded-lg`}
">
<slot />
</div>

<style lang="scss">
</style>
