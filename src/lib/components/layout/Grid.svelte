<script>
export let s = 1;
export let m = s;
export let l = m*2;
export let w_l = '800px';
export let w_m = '600px';
export let w_s = '400px';
export let direction = 'ltr';
export let styles = '';
export let gap = '1rem';
</script>

<div class="grid-container" style="direction: {direction};
--rows_l: {l}; --rows_m: {m}; --rows_s: {s};
--w_l: {w_l}; --w_m: {w_m}; --w_s: {w_s};
--gap: {gap};
{styles}  
">

    <slot />

</div>

<style>
    .grid-container {
          /* first breakpoint*/
            --w_l:800px;
            --rows_l:2;
            /* second breakpoint*/
            --w_m:600px;
            --rows_m:1;
            /* third breakpoint*/
            --w_s:400px;
            --rows_s:1;

    display: grid; 
    grid-gap: var(--gap);
    grid-template-rows: 1fr;
    /* grid-template-columns: repeat(var(--rows), 1fr); */
    grid-template-columns:
    repeat(auto-fill,
      minmax(clamp(clamp(clamp(  
            100%/(var(--rows_l) + 1) + 0.1%,
              (var(--w_l) - 100%)*1000,
            100%/(var(--rows_m) + 1) + 0.1%), 
              (var(--w_m) - 100%)*1000,
            100%/(var(--rows_s) + 1) + 0.1%), 
              (var(--w_s) - 100%)*1000,
            100%), 1fr));
    }
    .grid-container > :global(*) {
        direction: initial;
    }
</style>