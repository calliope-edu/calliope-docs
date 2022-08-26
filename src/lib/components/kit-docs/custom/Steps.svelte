<script  context="module">const CONTEXT_KEY = Symbol();
export function getStepsContext() {
    return getContext(CONTEXT_KEY);
}
</script>

<script >import { getContext, onDestroy, setContext } from 'svelte';
import { get, writable } from 'svelte/store';
const steps = writable(null);
setContext(CONTEXT_KEY, {
    steps,
    register() {
        steps.update((s) => s + 1);
        onDestroy(() => {
            steps.update((s) => s - 1);
        });
        return get(steps);
    },
});
</script>

<ol class="steps relative m-0 list-none space-y-6 p-0 992:space-y-4" style="counter-reset: 0;">
  <slot />
</ol>
