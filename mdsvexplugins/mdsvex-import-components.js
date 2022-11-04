import { visit } from 'unist-util-visit';

const scripts = `
    import Gap from '$lib/components/layout/Gap.svelte';
    import Grid from '$lib/components/layout/Grid.svelte';
    import ImageSwiper from '$lib/components/ImageSwiper.svelte';
    import { SwiperSlide } from 'swiper/svelte';
    // import Box from '$lib/components/Box.svelte';

    import Button from '$lib/components/elements/Button.svelte'

    // Import KitDocs components https://github.com/svelteness/kit-docs/
    import Box from '$lib/components/kit-docs/custom/Admonition.svelte';
    import No from '$lib/components/kit-docs/custom/No.svelte';
    import Yes from '$lib/components/kit-docs/custom/Yes.svelte';
    import Step from '$lib/components/kit-docs/custom/Step.svelte';
    import Steps from '$lib/components/kit-docs/custom/Steps.svelte';
    import TabbedLinks from '$lib/components/kit-docs/custom/TabbedLinks.svelte';
`;

const RE_SCRIPT_START =
  /<script(?:\s+?[a-zA-z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/i;

// injects imports for autoloading components
export default function autoImportComponents() {
  return function transformer(tree) {
    
    let is_script = false;
    visit(tree, 'html', (node) => {
    if (RE_SCRIPT_START.test(node.value)) {
        is_script = true;
        node.value = node.value.replace(RE_SCRIPT_START, (script) => `${script}\n${scripts}`);
    }
    });

    if (!is_script) {
    tree.children.push({
        type: 'html',
        value: `<script>\n${scripts}</script>`
    });
    }
  };
}