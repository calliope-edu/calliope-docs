<style lang="scss">
    div :global(*) {
        margin: 0;
    }
    div :global(table) {
        @apply w-full relative text-sm text-left text-gray-500;
    }

    div :global(thead) {
        @apply text-xs text-left text-gray-700 bg-gray-100;
    }

    div :global(thead th) {
        @apply py-3 px-6;
    }

    div :global(tbody tr) {
        @apply bg-white border-b hover:bg-gray-50;
    }

    div :global(tbody th) {
        @apply py-4 px-6 font-medium text-gray-900 whitespace-nowrap;
    }

    div :global(tbody td) {
        @apply py-4 px-6 align-middle;
    }
</style>



<div class="overflow-auto shadow-md sm:rounded-lg">
    <table>
        <slot />
    </table>
</div>