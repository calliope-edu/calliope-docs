<script>
    import DocsLayout from './__layout-docs.svelte';

    import { getSubpages } from '$lib/../sitemap.js';
    import { page } from '$app/state';
    import { getLocale } from "$lib/paraglide/runtime"
    
    export let meta;
    
    // Get current path from page store
    $: currentPath = (page?.params?.slugs || meta?.slug || '').replace(/\/$/, '');
  
    // Directly get subpages from current path
    $: pages = getSubpages(currentPath, getLocale());
  
    // Generate a deterministic color from a string
    function stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const hue = Math.abs(hash) % 360;
        return `hsl(${hue}, 70%, 55%)`;
    }
    
    // Get first letter or icon based on slug
    function getInitial(title, slug) {
        if (!title || title.length === 0) {
            // If no title, use first letter of slug
            return slug.charAt(0).toUpperCase();
        }
        return title.charAt(0).toUpperCase();
    }
    
    // Get pattern type based on slug
    function getPatternType(slug) {
        const patterns = ['circles', 'crosses', 'dots', 'waves', 'zigzag'];
        let hash = 0;
        for (let i = 0; i < slug.length; i++) {
            hash = slug.charCodeAt(i) + ((hash << 5) - hash);
        }
        return patterns[Math.abs(hash) % patterns.length];
    }
</script>


<DocsLayout {meta}>
  <slot></slot>
  {#if pages && pages.length > 0}
    <div class="cards-container">
      {#each pages as page, i}
        {#key page.slug}
          <a class="card card-${i % 4}" href="/{page.slug}/" data-sveltekit-prefetch>
            <div class="card-inner">
              {#if page.image}
                <div class="card-image">
                  <img src={`/${page.slug}/${page.image}`} alt={page.title} />
                  <div class="overlay"></div>
                </div>
              {:else}
                <!-- <div 
                  class="card-placeholder pattern-{getPatternType(page.slug)}" 
                  style="--card-color: {stringToColor(page.slug)};"
                >
                  <div class="initial-container">
                    <span class="card-initial">{getInitial(page.title, page.slug)}</span>
                  </div>
                </div> -->
              {/if}
              
              <div class="card-content">
                <div class="title-row">
                  <h3 class="card-title">{page.title ?? ''}</h3>
                  <span class="icon-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18">
                      <path d="M0 0h24v24H0V0z" fill="none"/>
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
                    </svg>
                  </span>
                </div>
                
                {#if page.description}
                  <p class="card-description">{page.description}</p>
                {/if}
              </div>
            </div>
          </a>
        {/key}
      {/each}
    </div>
  {/if}
</DocsLayout>

<style>
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .card {
    position: relative;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }
  
  .card-inner {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    border-radius: .25rem;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.03);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover .card-inner {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  /* Card color variations - more subtle */
  .card-0 .card-icon, .card-0 .overlay {
    background: linear-gradient(135deg, var(--primary, #3b82f6) 0%, #4f46e5 100%);
  }
  
  .card-1 .card-icon, .card-1 .overlay {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
  
  .card-2 .card-icon, .card-2 .overlay {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }
  
  .card-3 .card-icon, .card-3 .overlay {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }

  .card-image {
    position: relative;
    height: 160px;
    overflow: hidden;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s ease;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.15;
    mix-blend-mode: multiply;
    transition: opacity 0.3s ease;
  }
  
  .card:hover .card-image img {
    transform: scale(1.05);
  }
  
  .card:hover .overlay {
    opacity: 0.25;
  }
  
  /* New placeholder styling with patterns */
  .card-placeholder {
    position: relative;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--card-color, #4f46e5);
    overflow: hidden;
  }
  
  .card-placeholder::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.15;
  }

  /* Pattern variations for placeholders */
  .pattern-circles::before {
    background-image: radial-gradient(circle, white 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  .pattern-crosses::before {
    background-image: 
      linear-gradient(to right, white 1px, transparent 1px),
      linear-gradient(to bottom, white 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  .pattern-dots::before {
    background-image: radial-gradient(white 1px, transparent 1px);
    background-size: 10px 10px;
  }
  
  .pattern-waves::before {
    background: repeating-linear-gradient(
      45deg,
      white,
      white 5px,
      transparent 5px,
      transparent 25px
    );
  }
  
  .pattern-zigzag::before {
    background: 
      linear-gradient(135deg, white 25%, transparent 25%) -10px 0,
      linear-gradient(225deg, white 25%, transparent 25%) -10px 0,
      linear-gradient(315deg, white 25%, transparent 25%),
      linear-gradient(45deg, white 25%, transparent 25%);
    background-size: 20px 20px;
  }

  .initial-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 1;
    border: 2px solid rgba(255, 255, 255, 0.4);
  }

  .card-initial {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .card-content {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .card-title {
    position: relative;
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--headerColor, #1a202c);
    padding-bottom: 0.75rem;
    line-height: 1.3;
    flex: 1;
  }
  
  .card-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2.5rem;
    height: 2px;
    background: var(--card-color, var(--primary, #3b82f6));
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  .card:hover .card-title:after {
    width: 3.5rem;
  }

  .card-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #4a5568;
    margin: 0.25rem 0 0 0;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .icon-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary, #3b82f6);
    margin-left: 0.75rem;
    transition: transform 0.3s ease;
  }
  
  .card:hover .icon-arrow {
    transform: translateX(4px);
  }

  /* Responsive design */
  @media only screen and (max-width: 768px) {
    .cards-container {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .card-title {
      font-size: 1.3rem;
    }
  }

  @media only screen and (max-width: 480px) {
    .cards-container {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>