<script context="module" lang="ts">
  export const ssr = false
</script>

<script lang="ts">
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { blur } from 'svelte/transition'

  export let headingSelector = `main :where(h1, h2, h3, h4):not(.toc-exclude)`
  export let getHeadingTitles = (node: HTMLHeadingElement): string => node.innerText
  export let getHeadingIds = (node: HTMLHeadingElement): string => node.id
  export let getHeadingLevels = (node: HTMLHeadingElement): number =>
    Number(node.nodeName[1]) // get the number from H1, H2, ...
  export let activeHeading: HTMLHeadingElement | null = null
  export let open = false
  export let title = ``
  export let openButtonLabel = `Inhaltsverzeichnis dieser Seite`
  export let breakpoint = 1000
  export let flashClickedHeadingsFor = 1500
  export let keepActiveTocItemInView = true
  export let activeTopOffset = 100
  export let headings: HTMLHeadingElement[] = []
  export let desktop = true
  export let hide = false

  let windowWidth: number = 0;
  let windowHeight: number = 0;

  let aside: HTMLElement
  $: levels = headings.map(getHeadingLevels)
  $: minLevel = Math.min(...levels)
  $: desktop = windowWidth > breakpoint

  function close(event: MouseEvent) {
    if (!aside?.contains(event.target as Node)) open = false
  }

  // (re-)query headings on mount and on route changes
  function requery_headings() {
    if (typeof document === `undefined`) return // for SSR safety
    headings = [...document.querySelectorAll(headingSelector)] as HTMLHeadingElement[]
    setActiveHeading()
  }
  page.subscribe(requery_headings)
  onMount(requery_headings)

  function setActiveHeading() {
    let idx = headings.length
    while (idx--) {
      const { top } = headings[idx].getBoundingClientRect()

      // loop through headings from last to first until we find one that the viewport already
      // scrolled past. if none is found, set make first heading active
      if (top < activeTopOffset || idx === 0) {
        activeHeading = headings[idx]
        if (keepActiveTocItemInView) {
          // get the currently active ToC list item
          const activeTocLi = document.querySelector(`aside.toc > nav > ul > li.active`)
          activeTocLi?.scrollIntoView({ block: `nearest` })
        }
        return
      }
    }
  }

  function getOffsetTop(element) {
    return element ? (element.offsetTop + getOffsetTop(element.offsetParent)) : 0;
  }

  const clickHandler = (node: HTMLHeadingElement) => () => {
    open = false
    // Chrome doesn't (yet?) support multiple simultaneous smooth scrolls (https://stackoverflow.com/q/49318497)
    // with node.scrollIntoView(). Use window.scrollTo() instead.
    const scrollMargin = Number(getComputedStyle(node).scrollMarginTop.replace(`px`, ``)) || 92
    window.scrollTo({ top: getOffsetTop(node) - scrollMargin, behavior: `smooth` })

    // const scrollMargin = Number(getComputedStyle(node).scrollMarginTop.replace(`px`, ``)) || 92;
    // window.scrollBy({left: 0, top: node.getBoundingClientRect().top - scrollMargin, behavior: `smooth`})

    const id = getHeadingIds && getHeadingIds(node)
    if (id) history.replaceState({}, ``, `#${id}`)

    if (flashClickedHeadingsFor) {
      node.classList.add(`toc-clicked`)
      setTimeout(() => node.classList.remove(`toc-clicked`), flashClickedHeadingsFor)
    }
  }
</script>

<svelte:window
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}
  on:scroll={setActiveHeading}
  on:click={close}
/>
{#if !hide}
  <aside class="toc" class:desktop class:mobile={!desktop} bind:this={aside} aria-label="Table of Contents">
    
    {#if open || desktop}
      <div class="toc-container" transition:blur={{ duration: 200 }}>
        <div class="toc-section">
        {#if title}
        <!-- <div class="toc-title">
          {title}
        </div> -->
        {/if}
          <div class="toc-content">
          {#each headings as heading, idx}
          {@const level = (levels[idx] - minLevel)}
            <a href=#{getHeadingIds(heading)}
              class="toc-link {`level${level}`}"
              class:active={activeHeading === heading}
              aria-current={activeHeading === heading ? 'location' : undefined}
              on:click|preventDefault={clickHandler(heading)}>
                <!-- {#if level > 0}
                  <span class="toc-bullet"></span>
                {/if} -->
                <slot name="tocItem" {heading} {idx}>
                  {getHeadingTitles(heading)}
                </slot>
            </a>
          {/each}
        </div>
      </div>
      </div>
      {#if !desktop}
        <button 
          on:click|preventDefault|stopPropagation={() => (open = !open)}
          aria-label="Close table of contents"
          class="toc-close-btn">
          <span>×</span>
        </button>
      {/if}
    {/if}
    {#if !desktop}
      <button
        on:click|preventDefault|stopPropagation={() => (open = !open)}
        aria-label={openButtonLabel}
        class="toc-open-btn">
        {title || 'Table of Contents'}
      </button>
    {/if}
  </aside>
{/if}

<style lang="scss">
 .toc {
    background: #fff;
    border-radius: 6px;
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 0.5rem;
    width: 100%;
    bottom: 1rem;
    right: 1rem;
  }

  .toc-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .toc-section {
    padding: 0.5rem;
  }
  
  .toc-title {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  .toc-content {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  
  .toc-link {
    display: block;
    padding: 0.35rem 0;
    color: #333;
    text-decoration: none;
    font-size: 0.95rem;
    line-height: 1.3;
    transition: color 0.15s ease;
    
    &:hover {
      color: var(--primary, #0066cc);
      text-decoration: none;
    }
  }

  .level0 {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .level1 {
    padding-left: 0.8rem;
    // border-left: 2px solid #eee;
    margin-top: 0.25rem;
  }

  .level2, .level3 {
    padding-left: 1.6rem;
    font-size: 0.92em;
    color: rgba(0, 0, 0, 0.7);
  }



  .active {
    color: var(--primary, #0066cc);
    font-weight: 600;
    position: relative;
  }

  .active::before {
    content: "";
    position: absolute;
    left: -6px;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: var(--primary, #0066cc);
  }

  :where(aside.toc.mobile) {
    position: fixed;
    bottom: 1.5em;
    right: 1.5em;
    // max-width: 85vw;
    max-width: 50vw;
    z-index: 100;
  }

  :where(aside.toc.mobile > div) {
    border-radius: 6px;
    // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: white;
    overflow: auto;
    max-height: 80vh;
  }

  .toc-close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(0,0,0,0.1);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    
    &:hover {
      background: rgba(0,0,0,0.15);
    }
  }

  .toc-open-btn {
    display: block;
    width: 100%;
    margin-left: auto;
    padding: 1rem;
    background-color: var(--grey, #333); 
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: transform 0.2s ease;
    text-align: center;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  :where(aside.toc.mobile > div) {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  @media (max-width: 1000px) {
    .toc-content {
      max-height: 60vh;
      overflow-y: auto;
      padding-right: 0.5rem;
      
      /* Scrollbar styling for webkit browsers */
      &::-webkit-scrollbar {
        width: 4px;
      }
      
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
      }
    }
  }
</style>