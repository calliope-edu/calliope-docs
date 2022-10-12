<script>
    import SvelteLogo from '~icons/logos/svelte-icon'
    import IconCheckmark from '~icons/ri/checkbox-circle-line'

    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import UnfoldItem from '../../lib/components/elements/UnfoldItem.svelte'
    
</script>

<Meta 
    title="Elements/Unfold Item" 
    component={UnfoldItem}
    argTypes={{
        h: { control: 'number', description: 'Height of UnfoldItem in `rem`' },
    }}
/>

<Story name="Default">
    <UnfoldItem title="Lorem Ipsum">
        Dolor sit amed
    </UnfoldItem>

    <UnfoldItem title="Lorem Ipsum">
        Dolor sit amed
    </UnfoldItem>

    <UnfoldItem title="Lorem Ipsum">
        Dolor sit amed
    </UnfoldItem>
</Story>

<Story name='Farben'>
    <UnfoldItem title="Calliope" color='calliope'>Calliope</UnfoldItem>
    <UnfoldItem title="Rosa" color='rosa'>Rosa</UnfoldItem>
    <UnfoldItem title="Blau" color='blau'>Blau</UnfoldItem>
    <UnfoldItem title="Gruen" color='gruen'>Gruen</UnfoldItem>
    <UnfoldItem title="Lila" color='lila'>Lila</UnfoldItem>
    <UnfoldItem title="Gelb" color='gelb'>Gelb</UnfoldItem>
    <UnfoldItem title="Apricot" color='apricot'>Apricot</UnfoldItem>
    <UnfoldItem title="Grau" color='grau'>Grau</UnfoldItem>
    <UnfoldItem title="Calliope" color='calliope'>Calliope</UnfoldItem>
</Story>

<Story name='Gruppen'>
    <div class="prose">
        <h2>Gruppe B</h2>
        <UnfoldItem title="Lorem Ipsum" group='B' active>
            Dolor sit amed
        </UnfoldItem>
        <UnfoldItem title="Lorem Ipsum" group='B'>
            Dolor sit amed
        </UnfoldItem>
        <UnfoldItem title="Lorem Ipsum" group='B'>
            Dolor sit amed
        </UnfoldItem>
    </div>

    <div class="prose">
        <h2>Gruppe A (noclose) </h2>
        <UnfoldItem title="Lorem Ipsum" group='A' noclose active>
            Dolor sit amed
        </UnfoldItem>
        <UnfoldItem title="Lorem Ipsum"  group='A' noclose>
            Dolor sit amed
        </UnfoldItem>
        <UnfoldItem title="Lorem Ipsum"  group='A' noclose>
            Dolor sit amed
        </UnfoldItem>
    </div>
</Story>

<Story name="Before- und Title-Slot">
    <div class='prose'>
        <UnfoldItem>
            <IconCheckmark width="64px" height="32px" slot="before" />
            <div slot="title" class='text-xl'>
                Lorem Ipsum
            </div>
            Dolor sit amed
        </UnfoldItem>

        <UnfoldItem>
            <IconCheckmark width="64px" height="32px" slot="before" />
            <div slot="title" class='text-xl'>
                Lorem Ipsum
            </div>
            Dolor sit amed
        </UnfoldItem>

        <UnfoldItem>
            <IconCheckmark width="64px" height="32px" slot="before" />
            <div slot="title" class='text-xl'>
                Lorem Ipsum
            </div>
            Dolor sit amed
        </UnfoldItem>
    </div>
</Story>


<Story name="Mehrzeilige Überschrift">
    <UnfoldItem title="Lorem Ipsum">
        <div slot="before">
            <SvelteLogo width="64px" height="32px" />
        </div>
        <div slot="title">
            Lorem Ipsum<br>
            Dolor Sit<br>
            Lorem Ipsum Dolor
        </div>
        Dolor sit amed
    </UnfoldItem>
</Story>

