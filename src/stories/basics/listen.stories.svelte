<script>
	import Grid from './../../lib/components/layout/Grid.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ProseDecorator from './../Decorators/ProseDecorator.svelte';
</script>

<Meta 
    title="Basics/Listen" 
/>

<Story name="Listen">
    <ProseDecorator>
        <Grid>
            <div>
                <h2>Ungeordnete Liste</h2>
                <ul>
                    <li>hfgh</li>
                    <li>hfgh</li>
                    <li>hfgh</li>
                </ul>
            </div>

            <div>
                <h2>Geordnete Liste:</h2>
                <ol>
                    <li>hfgh</li>
                    <li>hfgh</li>
                    <li>hfgh</li>
                </ol>
            </div>
        </Grid>
    </ProseDecorator>
</Story>

<Story name="<ul>">
    <ProseDecorator>
        <ul>
            <li>hfgh</li>
            <li>hfgh</li>
            <li>hfgh</li>
        </ul>
    </ProseDecorator>
</Story>

<Story name="<ol>">
    <ProseDecorator>
        <ol>
            <li>hfgh</li>
            <li>hfgh</li>
            <li>hfgh</li>
        </ol>
    </ProseDecorator>
</Story>