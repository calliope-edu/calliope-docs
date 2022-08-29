<script>

export let item;
export let active;

</script>

<li class:active={active === '/'+item.slug || active === '/'+item.slug+'/'}
                            class="mt-12 lg:mt-8">
                                <a sveltekit:prefetch href="/{item.slug}/" on:click={()=>{active = '/'+item.slug;}}
                                    class="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200 block">
                                    <b>{item.title}</b>
                                </a>
                                <ul class="space-y-6 lg:space-y-2 border-l border-slate-200 dark:border-slate-800">
                                    {#each item.subpages as page}
                                        <li class:active={active.startsWith('/'+page.slug)}>
                                                <a sveltekit:prefetch href="/{page.slug}/" on:click={()=>{active = '/'+page.slug;}}
                                                    class="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
                                                    {page.title}
                                                </a>
                                        </li>
                                    {/each}
                                </ul>
                            </li>

<style>
    .active > a {
        @apply block border-l pl-4 -ml-px text-calliope-500 border-current font-semibold dark:text-calliope-400;
    }
</style>

