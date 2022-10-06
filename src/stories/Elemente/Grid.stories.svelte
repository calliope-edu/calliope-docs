<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import Grid from '../../lib/components/layout/Grid.svelte'

    let items = [...Array(12).keys()];

</script>

<Meta 
    title="Layout/Grid" 
    component={Grid}
    argTypes={{
        s: { description: 'Number of Columns, when Grid is wider than `w_s`. Minimum number of Columns at all.' },
        m: { control: 'number', description: 'Number of Columns, when Grid is wider than `w_m`. Default fallsback to the value of `s`.' },
        l: { control: 'number', description: 'Number of Columns, when Grid is wider than `w_l`. Default fallsback to the double value of `m`.' },
        w_s: { description: 'Min. wide of `Grid` to use Column number defined in `s`.' },
        w_m: { description: 'Min. wide of `Grid` to use Column number defined in `m`.' },
        w_l: { description: 'Min. wide of `Grid` to use Column number defined in `l`.' },
        gap: { description: 'Wide of Gap between Cells.' },
        direction: { description: 'Direction of Columns: `ltr` or `rtl`.' },
        styles: { description: 'Additional CSS Rules for the Grid can be added here.' },
    }}
/>

<Template let:args>
    <Grid {...args}>
        {#each items as i}
        <div>{i+1}</div>
        {/each}
    </Grid>
</Template>

<Story name="Default Grid" />

<Story name="Small Gaps (gap=2px)" args={{gap: '2px'}} />

<Story name="Right-to-Left (direction:rtl)" args={{direction: 'rtl'}} />

<Story name="Rowspan">
    <Grid>
        <div>1</div>
        <div>2</div>
        <div style="grid-column: span 2;">3</div>
        <div>4</div>
        <div>5</div>
        <div style="grid-column: span 2;">6</div>
    </Grid>
</Story>

<Story name="Two Third">
    <Grid s=1 m=3 l=3>
        <div style="grid-column: span 2;">1</div>
        <div>2</div>
    </Grid>
    <Grid  s=1 m=3 l=3 direction="rtl">
        <div style="grid-column: span 2;">1</div>
        <div>2</div>
    </Grid>
</Story>


<Story name="Nested Grid">
    <Grid s=2>
        <div>1</div>
        <div>2</div>
        <div><Grid s=2 >
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
        </Grid></div>
        <div>4</div>
    </Grid>
</Story>


<style>
    div {
        padding: .1rem;
        background: grey;
        background-image: linear-gradient(to bottom right, grey , silver);
        text-align: center;
        color: white;
    }

    div div {
        background-image: linear-gradient(to bottom right, silver , white);
    }
</style>