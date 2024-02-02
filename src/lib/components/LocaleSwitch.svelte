<script>

  import { _lang, languages } from '$lib/scripts/store.js';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  $: if(browser) document.documentElement.lang = $_lang.code;

  $: firstSlug = $page.params.slugs.split('/')[0];
  $: if(languages[firstSlug] != undefined) {
    $_lang = languages[firstSlug];
    if(browser) document.documentElement.lang = languages[firstSlug].code;
  } else {
    $_lang = languages['de']
    if(browser) document.documentElement.lang = languages['de'].code;
  }

  // $: currentPath = `${$page.url.pathname}${$page.url.search}`.replace(/^\/(en|de)\//, '/');
  $: currentPath = `${$page.url.pathname}`.replace(/^\/((en|de)\/)?/, '');
</script>

<svelte:head>
    <meta http-equiv="content-language" content="{$_lang.code}">
    {#each Object.values(languages) as language}
      <link rel="alternate" hreflang="{language.code}" href="{language.path}{currentPath}">
  {/each}
</svelte:head>

<div class="localeSelect" aria-label="{$_lang.code}, Select your language">
  {#each Object.values(languages) as language}
  {@const active = $_lang.code == language.code}
    <a class="ui image label" class:blue={active} href="{language.path}{currentPath}" lang="{language.code}" hreflang="{language.code}">
      {#if active}
        <i class="check icon" />
      {/if}
      {language.name}
      <div class="detail">{language.code.toUpperCase()}</div>
    </a>
{/each}
</div>

<style>
    .localeSelect {
      /* position: absolute;
      top: 0;
      left: 0; */
    }
</style>