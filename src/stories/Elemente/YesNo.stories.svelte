<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import Yes from '../../lib/components/elements/Yes.svelte';
    import No from '../../lib/components/elements/No.svelte';
  
</script>

<Meta 
    title="Elements/Yes & No" 
/>

<Story name="Yes & No">
    <Yes>Lorem Ipsum</Yes>
    <No>Lorem Ipsum</No>
</Story>

<Story name="Text">
<Yes>
    <div class='prose'>
        <p>Lorem ipsum</p>
        <p>ILorem ipsum</p>
        <p>Lorem ipsum</p>
        <p>ILorem ipsum</p>
    </div>
</Yes>
<No>
    <div class='prose'>
        <p>Lorem ipsum</p>
        <p>ILorem ipsum</p>
        <p>Lorem ipsum</p>
        <p>ILorem ipsum</p>
    </div>
</No>
<Yes>
    <div class='prose'>
        <p>Lorem ipsum</p>
        <p>ILorem ipsum</p>
        <p>Lorem ipsum</p>
        <p>ILorem ipsum</p>
    </div>
</Yes>
</Story>

<Story name="Yes">
    <Yes>Lorem Ipsum</Yes>
</Story>

<Story name="No">
    <No>Lorem Ipsum</No>
</Story>