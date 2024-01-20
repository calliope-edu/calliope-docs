<div class="overflow-auto">
    <table class="ui celled compact striped table">
        <slot />
    </table>
</div>

<style lang="scss">

    div :global(thead) {
        position: sticky; 
        top: 75px; 
    }

</style>