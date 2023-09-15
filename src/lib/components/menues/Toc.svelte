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
  export let title = `On this page`
  export let openButtonLabel = `Open table of contents`
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
  <aside class="toc px-8" class:desktop class:mobile={!desktop} bind:this={aside}>
    {#if !open && !desktop}
      <button
        on:click|preventDefault|stopPropagation={() => (open = true)}
        aria-label={openButtonLabel}
      >
        Toc
      </button>
    {/if}
    {#if open || desktop}
      <nav transition:blur>
        {#if title}
          <h2>{title}</h2>
        {/if}
        <ul class="text-slate-700 text-sm leading-6">
          {#each headings as heading, idx}
          {@const level = (levels[idx] - minLevel)}
          <!-- style:transform="translateX({levels[idx] - minLevel}em)"
          style:font-size="{2 - 0.2 * (levels[idx] - minLevel)}ex" -->
            <li>
              <button 
              class="{`level${level}`} group hover:text-calliope-500 dark:hover:text-calliope-400"
              class:active={activeHeading === heading}
              on:click={clickHandler(heading)}>
                {#if level > 0}
                  <svg width="3" height="24" viewBox="0 -9 3 24" class="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"><path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
                {/if}
                <slot name="tocItem" {heading} {idx}>
                  {getHeadingTitles(heading)}
                </slot>
              </button>
            </li>
          {/each}
        </ul>
      </nav>
    {/if}
  </aside>
{/if}

<style lang="scss">
button {
  text-align: left;
}
li {
  @apply cursor-pointer py-1 dark:text-slate-400;
}
.level0 {
   @apply block font-medium;
}
.level1 {
  @apply ml-4 flex items-start text-left;
}
.active {
  @apply text-calliope-500 dark:text-calliope-400;
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
</style>