<script context="module">
  export const prerender = true;

/** @type {import("@sveltejs/kit").Load} */
    export function load() {
      return {
        status: 307,
        redirect: '/docs/hardware/datenblatt/v2.0',
      };
    };
  </script>