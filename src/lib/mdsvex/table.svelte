<style lang="scss">
    // div :global(*) {
    //     margin: 0;
    // }
    // div :global(table) {
    // }

    div :global(thead) {
        position: sticky; 
        top: 75px; 
    }

    // div :global(thead th) {
    // }

    // div :global(tbody tr) {
    // }

    // div :global(tbody th) {
    // }

    // div :global(tbody td) {
    // }
</style>



<div class="overflow-auto">
    <table class="ui celled striped table">
        <slot />
    </table>
</div>