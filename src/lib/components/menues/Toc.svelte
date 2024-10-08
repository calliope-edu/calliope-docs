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
  <aside class="toc" class:desktop class:mobile={!desktop} bind:this={aside}>
    
    {#if open || desktop}
      <div class="ui compact secondary vertical fluid menu" transition:blur>
        <div class="item">
        {#if title}
        <div class="header">
          {title}
        </div>
        {/if}
        <!-- <div class="text-slate-700 text-sm leading-6"> -->
          <div class="menu">
          {#each headings as heading, idx}
          {@const level = (levels[idx] - minLevel)}
          <!-- style:transform="translateX({levels[idx] - minLevel}em)"
          style:font-size="{2 - 0.2 * (levels[idx] - minLevel)}ex" -->
            <!-- <li> -->
              <a href=#{getHeadingIds(heading)}
              class="item {`level${level}`}"
              class:active={activeHeading === heading}
              on:click|preventDefault={clickHandler(heading)}>
                {#if level > 0}
                  <!-- <svg width="3" height="24" viewBox="0 -9 3 24" class="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 text-slate-600"><path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg> -->
                {/if}
                <slot name="tocItem" {heading} {idx}>
                  {getHeadingTitles(heading)}
                </slot>
              </a>
            <!-- </li> -->
          {/each}
        </div>
      </div>
        <!-- </ul> -->
      </div>
    {/if}
    {#if !open && !desktop}
      <button
        on:click|preventDefault|stopPropagation={() => (open = true)}
        aria-label={openButtonLabel}
        class="ui button tiny fluid" style="background-color: var(--color-calliope); color: white;">
        {title}
      </button>
    {/if}
  </aside>
{/if}

<style lang="scss">
  .toc {
    // padding-left: 2rem;
    // padding-right: 2rem; 
    background: #fff;
    border-radius: 3px;
  }


.level0 {
}
.level1, .level2, .level3 {
  font-size: .7em !important;
  margin-left: 1em !important;
  font-style: italic;
}

  .active {
    color: #005F61;
  }

  :where(aside.toc.mobile) {
    position: fixed;
    bottom: 1em;
    right: 1em;
  }
  :where(aside.toc.mobile > nav) {
    border-radius: 3pt;
    width: var(--toc-mobile-width, 12em);
    bottom: -1em;
    right: 0;
    z-index: -1;
    background-color: var(--toc-mobile-bg, white);
  }

  .header {
      color: inherit;
  }
  .item {
        color: rgba(0,0,0,.6) !important;
        &:hover {
            color: rgba(0,0,0,.9) !important;
        }
        &.active {
        // color: var(--color-calliope) !important;
        color: #005F61 !important;
        }
    }

  .menu .menu {
      margin-top: 1rem !important;
    }
</style>