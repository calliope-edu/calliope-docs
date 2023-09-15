<script>
	import ProseDecorator from './../Decorators/ProseDecorator.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import Button from '../../lib/components/elements/Button.svelte';

</script>

<Meta 
    title="Elements/Button" 
    component={Button}
    parameters={{
        viewMode: 'docs',
    }}
    argTypes={{
        download: { control: {type: 'text'}, description: 'Definiert einen Namen für den Download.' },
        type: { options: ['default', 'border'],
                control: { type: 'radio' },
            },
        color: { options: ['calliope', 'rosa', 'blau', 'gruen', 'lila', 'gelb', 'apricot', 'grau', 'regenbogen'],
                control: { type: 'inline-radio' },
            },
        rounded: { options: ['full', 'none', 'l-full', 'r-full', 'rounded', ''],
                control: { type: 'inline-radio' },
            }
    }}
/>

<pre>
    <code>
        {`<Button color='calliope' type='default' rounded='full'>Calliope</Button>`}
    </code>
</pre>

<Template let:args>
    <ProseDecorator>
        <Button {...args}>
            Button
        </Button>
    </ProseDecorator>
</Template>

<Story name="Default" args={{type: 'default', link: '//google.de/sample.hex', download: 'Beispiel.hex', color: 'grau', rounded: 'full'}} />

<Story name="Farben">
    <Button color='calliope'>Calliope</Button>
    <Button color='rosa'>Rosa</Button>
    <Button color='blau'>Blau</Button>
    <Button color='gruen'>Gruen</Button>
    <Button color='lila'>Lila</Button>
    <Button color='gelb'>Gelb</Button>
    <Button color='apricot'>Apricot</Button>
    <Button color='grau'>Grau</Button>
    <Button color='regenbogen'>Regenbogen</Button>
</Story>

<Story name="Rahmen">
    <Button type='border' color='calliope'>Calliope</Button>
    <Button type='border' color='rosa'>Rosa</Button>
    <Button type='border' color='blau'>Blau</Button>
    <Button type='border' color='gruen'>Gruen</Button>
    <Button type='border' color='lila'>Lila</Button>
    <Button type='border' color='gelb'>Gelb</Button>
    <Button type='border' color='apricot'>Apricot</Button>
    <Button type='border' color='grau'>Grau</Button>
    <Button type='border' color='regenbogen'>Regenbogen</Button>
</Story>

<Story name="Rundung">
    <Button rounded='l-full'>Links Full</Button>
    <Button rounded='none'>None</Button>
    <Button rounded='r-full'>Rechts Full</Button>

    <Button rounded='full'>Full</Button>

    <Button rounded='rounded'>Rounded</Button>
    <Button rounded=''>Rounded</Button>
    
</Story>

<Story name="Link Arten">
    <Button link="./">Interner Link</Button>
    <Button link="#Button">Seiteninterner Link</Button>
    <Button link="//google.de">Externer Link</Button>
    <Button link="./sample.hex">Download Link</Button>
    <Button link="./sample.hex" download="Beispiel.hex">Download Namen Setzen</Button>
    <Button link="//google.de/sample.hex">Externer Download Link</Button>

    <Button link="//google.de/sample.hex" color="regenbogen">Externer Download Link Regenbogen</Button>
    <Button link="//google.de/sample.hex"color="regenbogen" type="border">Externer Download Link Border Regenbogen</Button>
</Story>

<Story name="Buttoninhalt definieren">
    <Button>Slot</Button>
    <Button text="Prop"></Button>
    <Button link="//google.de" rounded='' color="regenbogen">
        <img src='https://calliope.cc/assets/images/calliope_logo.png' alt='' />
    </Button>

</Story>