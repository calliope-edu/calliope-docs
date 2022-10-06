<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import SvelteLogo from '~icons/logos/svelte-icon'
  
</script>

<Meta 
    title="Basics/Icons" 
/>

<Story name="Icons">
     <!-- import SvelteLogo from '~icons/logos/svelte-icon' -->
    <SvelteLogo />

    <br>
      
    <SvelteLogo width="64" height="64"/>
</Story>

<Story name="Normal">
    <SvelteLogo />
</Story>

<Story name="Groß">
    <SvelteLogo width="64" height="64"/>
</Story>