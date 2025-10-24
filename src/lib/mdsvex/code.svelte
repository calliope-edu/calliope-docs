<script>
  import { onMount } from 'svelte';
  import hljs from 'highlight.js';
  // import 'highlight.js/styles/vs2015.css'; // Import a VSCode-like theme
  import 'highlight.js/styles/atom-one-dark.css'; // 


  const props = $props();
  let codeElement;
  let copied = $state(false);
  let timeout;
  
  // Extract language from class
  const languageClass = props.class || '';
  const languageMatch = languageClass.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1].toUpperCase() : '';
  const languageId = languageMatch ? languageMatch[1] : '';
  const isInline = !language;

  function copyToClipboard() {
    if (!codeElement) return;
    
    const text = codeElement.textContent || '';
    navigator.clipboard.writeText(text)
      .then(() => {
        copied = true;
        clearTimeout(timeout);
        timeout = setTimeout(() => copied = false, 2000);
      })
      .catch(err => console.error('Failed to copy code:', err));
  }
  
  onMount(() => {
    try {
      if (!languageId || !codeElement) return;
      hljs.highlightElement(codeElement);
    } catch (error) {
      console.error('Error highlighting code:', error);
    }
  });
</script>

<div class="code-container" class:inline={isInline}>{#if language}<div class="language-label">{language}</div>{/if}<pre class:inline={isInline}><code class="hljs {languageId}" class:inline={isInline} {...props} bind:this={codeElement}><slot /></code></pre>{#if !isInline}<button 
    class="copy-button" 
    on:click={copyToClipboard} 
    aria-label="Copy code to clipboard"
  >
    {#if copied}
      <span class="copied-icon">✔</span>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
      </svg>
    {/if}
  </button>{/if}</div>


<style lang="scss">
.code-container {
  position: relative;
  margin: 1.5em 0;
  border-radius: 0.5em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background-color: #282c34;
  /* border-left: 3px solid #3a86ff; */
  
  &.inline {
    display: inline;
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    background-color: transparent;
    overflow: visible;
  }
}

.hljs {
  padding-top: 2.8rem;
}

.language-label {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 0.7em;
  font-weight: 500;
  padding: 0.3em 0.8em;
  border-bottom-right-radius: 0.3em;
  letter-spacing: 0.05em;
  z-index: 10;
  font-family: 'Fira Code', monospace;
}

pre {
  margin: 0;
  padding: 0;
  background-color: transparent;
  
  &.inline {
    display: inline;
  }
}

code {
  display: block;
  padding: 1.2em;
  padding-top: 1.5em;
  border-radius: 0;
  overflow-x: auto;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
  line-height: 1.6;
  tab-size: 2;
  width: 100%;
  box-sizing: border-box;
  color: #e0e0e0;
  
  &.inline {
    display: inline;
    padding: 0.15em 0.5em;
    border-radius: 0.3em;
    background-color: rgba(245, 245, 245, 0.8);
    font-size: 0.9em;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    vertical-align: middle;
    margin: 0 0.2em;
    white-space: nowrap;
    color: #000;
    letter-spacing: 0.01em;
    width: auto;
    overflow: visible;
  }
}

.copy-button {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 0.3em 0.6em;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.3em;
  color: #e0e0e0;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3em;
  font-size: 0.8em;
  z-index: 20;
}

.copied-icon {
  color: #4ade80; /* Bright mint green - more vibrant than plain green */
  font-size: 1em;
  font-weight: bold;
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
  text-shadow: 0 0 8px rgba(74, 222, 128, 0.5); /* Subtle glow effect */
  transform-origin: center;
  animation: pulse .4s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.copy-button:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.copy-button:active {
  transform: translateY(0);
}
</style>