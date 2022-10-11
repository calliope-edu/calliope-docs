<script>
    import ProseDecorator from './../Decorators/ProseDecorator.svelte';
      import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  
      import Inline from '../../lib/components/layout/Inline.svelte';
      import Button from '../../lib/components/elements/Button.svelte';
  
  </script>
  
  <Meta 
      title="Layout/Inline" 
      component={Inline}
      argTypes={{
          align: { control: 'text', description: 'left, right, end' },
      }}
  />
  
  <Template let:args>
      <Inline {...args}>
      <div></div>
      <div></div>
      <div></div>
      </Inline>
  </Template>

  <Story name="Elemente Anordnen">
    <Inline align='left'>
        <Button color='rosa'>Rosa</Button>
        <h1>Headline H1</h1>
        </Inline>

        <Inline align='center'>
            <Button color='rosa'>Rosa</Button>
            <h1>Headline H2</h1>
            </Inline>

            <Inline align='end'>
                <Button color='rosa'>Rosa</Button>
                <h1>Headline H1</h1>
                </Inline>
</Story>