<script>
  import { locales, localizeHref, getLocale, setLocale } from '$lib/paraglide/runtime';
  import { languagesMeta } from '$lib/scripts/store.js';
  
</script>

<div class="localeSelect" aria-label="{getLocale()}, Select your language">
  {#each locales as locale}
    {@const active = getLocale() === locale}
    <a 
      class="locale-item" 
      class:active={active} 
      on:click={() => {setLocale(locale);}}
      lang="{locale}" 
      hreflang={locale}
      aria-current={active ? "page" : undefined}
    >
      {#if active}
        <span class="check-icon">✓</span>
      {/if}
      <span class="language-name">{languagesMeta[locale].name}</span>
      <div class="language-code">{locale.toUpperCase()}</div>
    </a>
  {/each}
</div>

<style>
  .localeSelect {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: flex-start;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .locale-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background-color: #f7f7f7;
    border-radius: 4px;
    font-weight: 500;
    text-decoration: none;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    text-transform: capitalize;
    min-width: 80px;
  }

  .locale-item:hover {
    background-color: #e3e3e3;
    transform: translateY(-2px);
  }

  .locale-item.active {
    background-color: #383838;
    color: white;
  }

  .check-icon {
    color: white;
    margin-right: 8px;
    font-size: 14px;
  }

  .language-name {
    font-size: 0.9rem;
  }

  .language-code {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-left: 6px;
  }

  @media (max-width: 768px) {
    .localeSelect {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
    }

    .locale-item {
      width: 100%;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    
    .locale-item .language-name {
      font-size: 1rem;
    }
  }
</style>