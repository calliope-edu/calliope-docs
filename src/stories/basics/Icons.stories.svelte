<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import SvelteLogo from '~icons/logos/svelte-icon'
  
</script>

<Meta 
    title="Basics/Icons" 
/>

<Story name="Icons">
    <SvelteLogo />

    <br>
      
    <SvelteLogo width="64" height="64"/>

    <br>

    <div class='prose'>
        <p>Icons müssen vor verwendung per JS-Import geladen werden.</p>
        <pre>import SvelteLogo from '~icons/logos/svelte-icon'</pre>
        <p>Der Import setzt sich zusammen aus '~icons/[BIBLIOTHEK]/ICON NAME]`. Das Icon 'ri:alert-fill' würde also mit '~icons/ri/alert-fill' importiert.</p>
        <p>Alle Icons sind hier gelistet: <a href="https://icones.js.org/collection/all" target="_blank">https://icones.js.org/collection/all</a></p>
        <p>Häufige Icons können wir auch ohne Import verfügbar machen. Bisher sind das:</p>
        <ul>
            <li>Keine</li>
        </ul>
    </div>

</Story>

<Story name="Normal">
    <SvelteLogo />
</Story>

<Story name="Groß">
    <SvelteLogo width="64" height="64"/>
</Story>