<script>
	import Grid from './../../lib/components/layout/Grid.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ProseDecorator from './../Decorators/ProseDecorator.svelte';
</script>

<Meta 
    title="Basics/Farben" 
/>

<Story name="Farben">
    <ProseDecorator>
        <div class='bg-inherit'>inherit</div>
        <div class='bg-current'><span class='text-slate-200'>current</span></div>
        <div class='bg-transparent'>transparent</div>
        <div class='bg-black'><span class='text-slate-200'>black</span></div>
        <div class='bg-white'>white</div>
        <h2>Slate</h2>
        <h3>Alle Farben aus Tailwind sind verfügbar: <a href="https://tailwindcss.com/docs/customizing-colors" target="_blank">https://tailwindcss.com/docs/customizing-colors</a></h3>
        <div class='bg-slate-50'>slate-50</div>
        <div class='bg-amber-500'>amber-500</div>
        <div class='bg-rose-500'>rose-500</div>
        <div class='bg-sky-500'>sky-500</div>
        <h2>Calliope</h2>
        <div class='bg-calliope-50'>50</div>
        <div class='bg-calliope-100'>100</div>
        <div class='bg-calliope-200'>200</div>
        <div class='bg-calliope-300'>300</div>
        <div class='bg-calliope-400'>400</div>
        <div class='bg-calliope'>calliope / 500</div>
        <div class='bg-calliope-600'><span class='text-slate-200'>600</span></div>
        <div class='bg-calliope-700'><span class='text-slate-200'>700</span></div>
        <div class='bg-calliope-800'><span class='text-slate-200'>800</span></div>
        <div class='bg-calliope-900'><span class='text-slate-200'>900</span></div>
        <h2>Pink (überschreibt Tailwind default)</h2>
        <div class='bg-pink'>pink / 500</div>
        <h2>Blue (überschreibt Tailwind default)</h2>
        <div class='bg-blue'>blue / 500</div>
        <h2>Green (überschreibt Tailwind default)</h2>
        <div class='bg-green'>green / 500</div>
        <h2>Purple (überschreibt Tailwind default)</h2>
        <div class='bg-purple'>purple / 500</div>
        <h2>Yellow (überschreibt Tailwind default)</h2>
        <div class='bg-yellow'>yellow / 500</div>
        <h2>Orange (überschreibt Tailwind default)</h2>
        <div class='bg-orange'>orange / 500</div>
        <h2>Gray (überschreibt Tailwind default)</h2>
        <div class='bg-gray'>gray / 500</div>

    </ProseDecorator>
</Story>

<style>
    div {
        margin: .5rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100px;
        height: 100px;
        @apply shadow;
        font-size: .8rem;
    }
</style>