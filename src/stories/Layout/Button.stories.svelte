<script>
	import ProseDecorator from './../Decorators/ProseDecorator.svelte';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import Button from '../../lib/components/elements/Button.svelte';

</script>

<Meta 
    title="Elements/Button" 
    component={Button}
    argTypes={{
        download: { description: 'Force a download `true` or provide a name' },
        type: { options: ['default', 'border'],
                control: { type: 'radio' },
            }
    }}
/>

<Template let:args>
    <ProseDecorator>
        <Button {...args}>
            Button
        </Button>
    </ProseDecorator>
</Template>

<Story name="Default" args={{type: 'default', link: ''}} />

<Story name="Farben">
    <Button color='calliope'>Button</Button>
    <Button color='rosa'>Button</Button>
    <Button color='blau'>Button</Button>
    <Button color='gruen'>Button</Button>
    <Button color='lila'>Button</Button>
    <Button color='gelb'>Button</Button>
    <Button color='apricot'>Button</Button>
    <Button color='grau'>Button</Button>
</Story>

<Story name="Rahmen">
    <Button type='border' color='calliope'>Button</Button>
    <Button type='border' color='rosa'>Button</Button>
    <Button type='border' color='blau'>Button</Button>
    <Button type='border' color='gruen'>Button</Button>
    <Button type='border' color='lila'>Button</Button>
    <Button type='border' color='gelb'>Button</Button>
    <Button type='border' color='apricot'>Button</Button>
    <Button type='border' color='grau'>Button</Button>
</Story>

<Story name="Link Arten">
    <Button link="./">Interner Link</Button>
    <Button link="#Button">Seiteninterner Link</Button>
    <Button link="//google.de">Externer Link</Button>
    <Button link="./sample.hex">Download Link</Button>
    <Button link="./sample.hex" download="Beispiel.hex">Download Namen Setzen</Button>
    <Button link="//google.de/sample.hex">Externer Download Link</Button>
</Story>

<Story name="Buttoninhalt definieren">
    <Button>Slot</Button>
    <Button text="Prop"></Button>
    <Button link="//google.de"><img src='https://calliope.cc/assets/images/calliope_logo.png' alt='' /></Button>

</Story>