<script context="module">

    async function loadTemplates() {
        const files = await import.meta.globEager(`./*.{svelte,md,svx}`);
        return files;
    }

    const templates = loadTemplates();

</script>

<script>
    export let meta;
    export let template = meta.template ?? 'default';
    export let depth = 0;
    let TemplateComponent;
    let templatesArray = template.split(',')
    let currentTemplate = templatesArray[depth];
    let nextDepth = depth + 1;

    function changeTemplate(tmpl) {
        templatesArray = tmpl.split(',')
        currentTemplate = templatesArray[depth];
    }

    $: template = meta.template ?? 'default';
    $: changeTemplate(template);
  

    $: if(currentTemplate != ''){
        templates.then(function(value) {
            let match;
            for (const [path, resolver] of Object.entries(value)) {
                let filename = path.slice(0, path.lastIndexOf("."));
                // console.log(filename)
                if (filename === `./__layout-${currentTemplate}`) {
                    match = [path, resolver];
                    break;
                }
            }
            // console.log(match)
            if(match){
                TemplateComponent = match[1]?.default;
            }
        });
    }

</script>

{#if depth < templatesArray.length}
    {#if TemplateComponent != undefined}
        <svelte:component this={TemplateComponent} {meta}>
                <svelte:self depth={nextDepth} {meta}>
                    <slot />
                </svelte:self>
        </svelte:component>
    {:else}
        <svelte:self depth={nextDepth} {meta}>
            <slot />
        </svelte:self>
    {/if}
{:else}
    {#if TemplateComponent != undefined}
        <svelte:component this={TemplateComponent} {meta}>
            <slot />
        </svelte:component>
    {:else}
        <slot />
    {/if}
{/if}
