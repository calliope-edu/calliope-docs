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

<ol class="steps">
  <slot />
</ol>


<style lang="scss">
.steps {
  position: relative;
  margin: 0;
  list-style-type: none;
  padding: 1rem 0;
  counter-reset: step;
}
</style>