<script context="module">
    import { defineMeta } from '@storybook/addon-svelte-csf';

    import PinoutV3 from '../../content/tech/[...02]hardware/[...02]pins/PinoutV3.svelte';

    const { Story } = defineMeta({
        title: 'Tech/PinoutV3',
        component: PinoutV3
    });
</script>

<Story name="Responsive widths">
    {#snippet template(args)}
        <div class="preview-grid">
            <div class="container" style="width: 1024px">
                <div class="label">1024px — Desktop</div>
                <div class="frame story-pinout-frame"><PinoutV3 /></div>
            </div>

            <div class="container" style="width: 768px">
                <div class="label">768px — Tablet</div>
                <div class="frame story-pinout-frame"><PinoutV3 /></div>
            </div>

            <div class="container" style="width: 425px">
                <div class="label">425px — Large Mobile</div>
                <div class="frame story-pinout-frame"><PinoutV3 /></div>
            </div>

            <div class="container" style="width: 375px">
                <div class="label">375px — Mobile</div>
                <div class="frame story-pinout-frame"><PinoutV3 /></div>
            </div>

            <div class="container" style="width: 320px">
                <div class="label">320px — Small Mobile</div>
                <div class="frame story-pinout-frame"><PinoutV3 /></div>
            </div>
        </div>
    {/snippet}
</Story>

<style>
    .preview-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: flex-start;
    }

    .container {
        background: var(--color-surface, #fff);
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        padding: 12px;
        box-shadow: 0 1px 6px rgba(0,0,0,0.04);
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .label {
        font-size: 12px;
        color: var(--color-text-muted, #666);
        padding: 6px 4px 10px 4px;
        text-align: left;
        font-weight: 600;
    }

    .frame {
        border-radius: 6px;
        overflow: hidden;
        background: var(--color-ghost, #f8f9fb);
        min-height: 300px;
        height: 720px;
        display: block;
    }
</style>
