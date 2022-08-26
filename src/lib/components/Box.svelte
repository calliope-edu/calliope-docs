<script>
    export let type = 'info';
</script>



<div class='box {type}'>
    <div class='title'>
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" class="mr-1.5 text-xl"><path fill="currentColor" d="m15 14l-.117.007a1 1 0 0 0-.876.876L14 15v6H3.998A.996.996 0 0 1 3 20.007V3.993C3 3.445 3.445 3 3.993 3h16.014c.548 0 .993.447.993.999V14h-6zm6 2l-5 4.997V16h5z"></path></svg>
        <span>{type}</span>
    </div>
    
    <slot />

</div>

<style lang="scss">
    .box {
        padding: 2em;
        padding-bottom: 1em;
        background-color: var(--primary);
        --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);
        box-shadow: 0 0 #0000,0 0 #0000,var(--tw-shadow);

        &:global(.warning) {
            background-color: var(--color-yellow);
        }
        &:global(.danger) {
            background-color: var(--color-red);
        }

        .title {
            opacity: .6;
            margin-bottom: 1em;
            text-transform: uppercase;
        }

        :global(*) {
            color: var(--primary-inverse);
        }
    }


</style>
