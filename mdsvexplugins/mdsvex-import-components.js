import { visit } from 'unist-util-visit';

const scripts = `
    import Svg from '$lib/components/elements/Svg.svelte';
    import GitLink from '$lib/components/elements/GitLink.svelte';  
    import Versions from '$lib/components/BoardVersionSelector.svelte';
    import Gap from '$lib/components/layout/Gap.svelte';
    import Grid from '$lib/components/layout/Grid.svelte';
    import ImageSwiper from '$lib/components/ImageSwiper.svelte';
    // import { SwiperSlide } from 'swiper/svelte';
    import Box from '$lib/components/elements/Box.svelte';
    //import Video from '$lib/components/elements/Video.svelte';
    //import Youtube from "svelte-youtube-embed";
    import { YouTube, Vimeo, GenericEmbed } from 'sveltekit-embed'
    import Divider from '$lib/components/elements/Divider.svelte'
    import Zigzag from '$lib/components/elements/Zigzag.svelte'

    import Button from '$lib/components/elements/Button.svelte'
    import UnfoldItem from '$lib/components/elements/UnfoldItem.svelte'

    // Import KitDocs components https://github.com/svelteness/kit-docs/
    import Admonition from '$lib/components/kit-docs/custom/Admonition.svelte';
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
