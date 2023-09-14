import { visit } from 'unist-util-visit';

const scripts = `
import Blog from '$lib/templates/__layout-blog.svelte';
import Default from '$lib/templates/__layout-default.svx';
import DocsContents from '$lib/templates/__layout-docs-contents.svelte';
import Docs from '$lib/templates/__layout-docs.svelte';

let availTemplatesArray = {
  blog: Blog,
  default: Default,
  docs_contents: DocsContents,
  docs: Docs,
}
`;

const TEMPLATES_SLUG = 'let availTemplatesArray = {}';
// injects imports for autoloading components
export default function autoImportComponents() {
  return function transformer(tree) {
      visit(tree, 'html', (node) => {        
      if (node.value.search(TEMPLATES_SLUG) != -1) {
          node.value = node.value.replace(TEMPLATES_SLUG, scripts)
          console.log(node.value);
      }
    });
  };
}