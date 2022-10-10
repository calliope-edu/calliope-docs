<script>
    import SvelteLogo from '~icons/logos/svelte-icon'

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

<Template let:args>
    <UnfoldItem>
        <div slot="before">
            <SvelteLogo width="64px" height="32px" />
        </div>
        <div slot="title">
            Lorem Ipsum
        </div>
        Dolor ist amed
    </UnfoldItem>
</Template>

<Story name="Simple usage">

    <UnfoldItem title="Lorem Ipsum" group='A' noclose active>
        Dolor ist amed
    </UnfoldItem>

    <UnfoldItem title="Lorem Ipsum"  group='A' noclose>
        Dolor ist amed
    </UnfoldItem>

    <UnfoldItem title="Lorem Ipsum" group='B' noclose>
        Dolor ist amed
    </UnfoldItem>

    <UnfoldItem title="Lorem Ipsum" group='B'>
        Dolor ist amed
    </UnfoldItem>

    <UnfoldItem title="Lorem Ipsum" noclose>
        Dolor ist amed
    </UnfoldItem>

    <UnfoldItem title="Lorem Ipsum">
        Dolor ist amed
    </UnfoldItem>


</Story>

<Story name="Full usage">
    <UnfoldItem>
        <div slot="before">
            <SvelteLogo width="64px" height="32px" />
        </div>
        <div slot="title">
            Lorem Ipsum
        </div>
        Dolor ist amed
    </UnfoldItem>

    <UnfoldItem>
        <div slot="before">
            <SvelteLogo width="64px" height="32px" />
        </div>
        <div slot="title">
            Lorem Ipsum
        </div>
        Dolor ist amed
    </UnfoldItem>

    <UnfoldItem>
        <div slot="before">
            <SvelteLogo width="64px" height="32px" />
        </div>
        <div slot="title">
            Lorem Ipsum
        </div>
        Dolor ist amed
    </UnfoldItem>
</Story>

<Story name="Small h=0.5" args={{h: 0.5}}/>

