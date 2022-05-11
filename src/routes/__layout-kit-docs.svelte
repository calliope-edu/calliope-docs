<script context="module">
  export const prerender = true;

  export const load = createKitDocsLoader({
    sidebar: {
      '/': null,
      '/docs': '/docs',
    },
  });
</script>

<script>
  import '@svelteness/kit-docs/client/polyfills/index.js';
  import '@svelteness/kit-docs/client/styles/normalize.css';
  import '@svelteness/kit-docs/client/styles/fonts.css';
  import '@svelteness/kit-docs/client/styles/theme.css';
  import '@svelteness/kit-docs/client/styles/vars.css';

  import { page } from '$app/stores';
  import SvelteLogo from '$img/svelte-horizontal.svg?raw';

  import {
    Button,
    KitDocs,
    KitDocsLayout,
    createKitDocsLoader,
    createSidebarContext,
  } from '@svelteness/kit-docs';

  const i18n = {
    nav: {
    previous: 'Zurück',
    next: 'Weiter',
    mainMenu: 'Hauptmenü',
    openSidebar: 'Öffne Seitenleiste',
    options: 'Optionen',
    links: 'Links',
  },
  toc: {
    title: 'Auf dieser Seite',
  },
  colorScheme: {
    title: 'Farbethema',
    light: 'Hell',
    dark: 'Dunkel',
    system: 'System',
    theme: 'Theme',
  },
  dialog: {
    close: 'Dialog schließen',
  },
  admonition: {
    note: 'HINWEIS',
    info: 'INFO',
    tip: 'TIPP',
    warning: 'WARNUNG',
    danger: 'GEFAHR',
    experimental: 'EXPERIMENTEL',
  },
  code: {
    copy: 'Kopieren',
    copied: 'Kopiert!',
  },
}

  /** @type {import('@svelteness/kit-docs').MarkdownMeta | null} */
  export let meta = null;

  /** @type {import('@svelteness/kit-docs').ResolvedSidebarConfig | null} */
  const sidebar = 
  {
      links: 
    {
      'Erste Schritte': [
        { title: 'Lieferumfang', slug: '/docs/erste-schritte/lieferumfang'},
        { title: 'Aufbauen & Anschließen', slug: '/docs/erste-schritte/aufbau'},
        { title: 'Demoprogramm', slug: '/docs/erste-schritte/demoprogramm'},
        { title: '25 Programme', slug: '/docs/erste-schritte/25programme'},
      ],
      'Hardware': [
        { title: 'Datenblätter', slug: '/docs/hardware/datenblatt'},
        { title: 'Unterschiede mini Versionen', slug: '/docs/hardware/unterschiede'},
        { title: 'Bauteile', slug: '/docs/hardware/bauteile'},
      ],
      'Fehlerbehebungen': [
        { title: 'Bootloader', slug: '/docs/fehlerbehebungen/bootloader'},
      ],
    }
  }

  
  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [{ title: 'Documentation', slug: '/docs', match: /\/docs/ }],
  };

  const { activeCategory } = createSidebarContext(sidebar);

  $: category = $activeCategory ? `${$activeCategory}: ` : '';
  $: title = meta ? `${category}${meta.title} | KitDocs` : null;
  $: description = meta?.description;
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if description}
      <meta name="description" content={description} />
    {/if}
  {/key}
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar} {i18n}>
    <div class="logo" slot="navbar-left">
      <Button href="/">
        {@html SvelteLogo}
      </Button>
    </div>

    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  :global(:root) {
    --kd-color-brand-rgb: 233, 127, 6;
  }

  :global(:root.dark) {
    --kd-color-brand-rgb: 213, 149, 76;
  }

  .logo :global(a) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo :global(svg) {
    height: 36px;
    overflow: hidden;
  }
</style>
