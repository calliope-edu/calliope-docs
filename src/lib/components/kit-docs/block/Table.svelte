<script >import TableWrapper from './TableWrapper.svelte';
let __class = '';
export { __class as class };
</script>

<TableWrapper class={__class}>
  <table>
    <thead
      class="sticky top-0 left-0 border-b border-gray-divider bg-gray-50 shadow-sm"
    >
      <slot name="head" />
    </thead>
    <tbody>
      <slot name="body" />
    </tbody>
  </table>
</TableWrapper>
