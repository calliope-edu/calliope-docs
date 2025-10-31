<script context="module">
    import { defineMeta } from '@storybook/addon-svelte-csf';

	import Grid from '../../lib/components/layout/Grid.svelte';

	let items = [...Array(12).keys()];

	const { Story } = defineMeta({
		title: 'Layout/Grid',
		component: Grid,
		argTypes: {
			s: {
				control: 'number',
				description:
					'Number of Columns, when Grid is wider than `w_s`. Minimum number of Columns at all.'
			},
			m: {
				control: 'number',
				description:
					'Number of Columns, when Grid is wider than `w_m`. Default fallsback to the value of `s`.'
			},
			l: {
				control: 'number',
				description:
					'Number of Columns, when Grid is wider than `w_l`. Default fallsback to the double value of `m`.'
			},
			w_s: {
				control: 'text',
				description: 'Min. wide of `Grid` to use Column number defined in `s`. E.g. "0px", "600px"'
			},
			w_m: {
				control: 'text',
				description: 'Min. wide of `Grid` to use Column number defined in `m`. E.g. "900px"'
			},
			w_l: {
				control: 'text',
				description: 'Min. wide of `Grid` to use Column number defined in `l`. E.g. "1200px"'
			},
			gap: {
				control: 'text',
				description: 'Wide of Gap between Cells. E.g. "1rem", "10px", "2px"'
			},
			direction: {
				control: 'radio',
				options: ['ltr', 'rtl'],
				description: 'Direction of Columns: `ltr` (left-to-right) or `rtl` (right-to-left).'
			},
			styles: {
				control: 'text',
				description: 'Additional CSS Rules for the Grid can be added here.'
			}
		}
	});
</script>

<Story
	name="All Props"
	args={{
		s: 2,
		m: 3,
		l: 4,
		gap: '1rem',
		direction: 'ltr'
	}}
>
	{#snippet template(args)}
		<Grid {...args}>
			{#each items as i}
				<div>{i + 1}</div>
			{/each}
		</Grid>
	{/snippet}
</Story>

<Story name="Small Gaps (gap=2px)" args={{ gap: '2px' }}>
	{#snippet template(args)}
		<Grid {...args}>
			{#each items as i}
				<div>{i + 1}</div>
			{/each}
		</Grid>
	{/snippet}
</Story>

<Story name="Responsive Columns (s=1, m=2, l=4)">
	{#snippet template(args)}
		<Grid s={1} m={2} l={4}>
			{#each items as i}
				<div>{i + 1}</div>
			{/each}
		</Grid>
	{/snippet}
</Story>

<Story name="Fixed Columns (s=3, no m/l)">
	{#snippet template(args)}
		<Grid s={3}>
			{#each items as i}
				<div>{i + 1}</div>
			{/each}
		</Grid>
	{/snippet}
</Story>

<Story name="Custom Breakpoints (w_m='500px', w_l='1000px')">
	{#snippet template(args)}
		<Grid s={1} m={2} l={3} w_m="500px" w_l="1000px">
			{#each items as i}
				<div>{i + 1}</div>
			{/each}
		</Grid>
	{/snippet}
</Story>

<Story name="Right-to-Left (direction:rtl)" args={{ direction: 'rtl' }}>
	{#snippet template(args)}
		<Grid {...args}>
			{#each items as i}
				<div>{i + 1}</div>
			{/each}
		</Grid>
	{/snippet}
</Story>

<Story name="Rowspan">
	{#snippet template(args)}
		<Grid>
			<div>1</div>
			<div>2</div>
			<div style="grid-column: span 2;">3</div>
			<div>4</div>
			<div>5</div>
			<div style="grid-column: span 2;">6</div>
		</Grid>
	{/snippet}
</Story>

<Story name="Two Third">
	{#snippet template(args)}
		<Grid s={1} m={3} l={3}>
			<div style="grid-column: span 2;">1</div>
			<div>2</div>
		</Grid>
		<Grid s={1} m={3} l={3} direction="rtl">
			<div style="grid-column: span 2;">1</div>
			<div>2</div>
		</Grid>
	{/snippet}
</Story>

<Story name="Nested Grid">
	{#snippet template(args)}
		<Grid s={2}>
			<div>1</div>
			<div>2</div>
			<div>
				<Grid w_s="0px">
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
					<div>5</div>
					<div>6</div>
				</Grid>
			</div>
			<div>4</div>
		</Grid>
	{/snippet}
</Story>


<style>
    div {
        background: grey;
        background-image: linear-gradient(to bottom right, grey , silver);
        text-align: center;
        color: white;
    }

    div div {
        background-image: linear-gradient(to bottom right, silver , white);
    }
</style>