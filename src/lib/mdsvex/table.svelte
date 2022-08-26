<style>
    div :global(*) {
        margin: 0;
    }
    div :global(table) {
        @apply w-full relative text-sm text-left text-gray-500 dark:text-gray-400;
    }

    div :global(thead) {
        @apply text-xs text-left text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400;
    }

    div :global(thead th) {
        @apply py-3 px-6;
    }

    div :global(tbody tr) {
        @apply bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600;
    }

    div :global(tbody th) {
        @apply py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white;
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