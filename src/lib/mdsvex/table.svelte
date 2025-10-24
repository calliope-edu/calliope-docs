<div class="overflow-auto">
    <table class="custom-table">
        <slot />
    </table>
</div>

<style lang="scss">
    table.custom-table {
        width: 100%;
        border-collapse: collapse;
        border-radius: .5rem;

        :global(thead) {
            position: sticky; 
            top: 65px; 
        }
        :global(th), :global(td) {
            border: 1px solid #ddd;
            padding: .8rem;
        }
        :global(th) {
            background-color: #f2f2f2;
            text-align: left;
        }
        :global(tr:nth-child(even)) {
            background-color: #f6f6f6;
        }
        :global(tr:hover) {
            background-color: rgba(var(--primaryRGB), 0.1);
        }

        @media(max-width: 480px) {
            :global(td), :global(th) {
                display: block;
                display: row;
                width: 100%;

            }
        }
    }
</style>