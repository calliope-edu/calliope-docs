<script>
  export let color = "calliope"; // Default color if none is detected
  let data;

  // Reactive statement to check and set color based on innerHTML
  $: if (data?.innerHTML.trim().toUpperCase().startsWith("V1")) {
    color = "v1";
} else if (data?.innerHTML.trim().toUpperCase().startsWith("V2")) {
    color = "v2";
} else if (data?.innerHTML.trim().toUpperCase().startsWith("V3")) {
    color = "v3";
} else if (data?.innerHTML.trim().toUpperCase().startsWith("V0")) {
    color = "v0";
}
</script>

<b bind:this={data} class="highlight" style="background-color: var(--color-{color});">
  <slot />
</b>

<style>
  .highlight {
      color: #fff;
      padding: .2em .5em .1em .5em;
      border-radius: 6px;
      display: inline-block; /* Ensures proper padding and background */
  }
</style>