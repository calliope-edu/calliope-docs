<script>
	import { selectedBoardVersion } from '$lib/scripts/store.js';
	import Dropdown from '$lib/components/elements/Dropdown.svelte';
	import DropdownItem from '$lib/components/elements/DropdownItem.svelte';

	export let dropdown = false;
	const versionen = [1, 2, 3];
</script>

<div class="board-version-selector">
	{#if dropdown}
		<!-- Use our new Dropdown component (Svelte 5 snippets) -->
		<Dropdown placement="bottom-end" minWidth="160px">
			{#snippet trigger()}
				<button class="bv-trigger" aria-haspopup="menu" aria-expanded={false}>
					<span class="bv-label">Calliope mini {$selectedBoardVersion}</span>
					<span class="bv-caret">▾</span>
				</button>
			{/snippet}

			<!-- default children snippet: the dropdown menu items -->
			<div class="bv-menu">
				{#each versionen as num}
					<DropdownItem
						onselected={() => ($selectedBoardVersion = num)}
						selected={$selectedBoardVersion == num}
						title={`Calliope mini ${num}`}
					/>
				{/each}
			</div>
		</Dropdown>
	{:else}
		<div class="bv-buttons" role="group" aria-label="Select Calliope board version">
			{#each versionen as num}
				<button
					on:click={() => ($selectedBoardVersion = num)}
					class="bv-btn"
					class:active={$selectedBoardVersion == num}
					aria-pressed={$selectedBoardVersion == num}
				>
					V{num}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.board-version-selector {
		display: inline-flex;
		align-items: center;

		.bv-trigger {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.375rem 0.6rem;
			border-radius: 8px;
			background: transparent;
			border: 1px solid rgba(0,0,0,0.08);
			color: var(--color-grau, #222);
			cursor: pointer;
			font-weight: 500;
			font-size: 0.95rem;

			&:hover {
				background: rgba(0,0,0,0.03);
			}

			.bv-caret {
				font-size: 0.8rem;
				opacity: 0.9;
			}
		}

		.bv-menu {
			min-width: 160px;
			display: flex;
			flex-direction: column;
			padding: 0.25rem 0;
		}

		.bv-buttons {
			display: inline-flex;
			gap: 0.4rem;

			.bv-btn {
				padding: 0.3rem 0.6rem;
				border-radius: 6px;
				background: transparent;
				border: 1px solid rgba(0,0,0,0.08);
				cursor: pointer;
				color: var(--color-grau, #222);
				font-size: 0.9rem;

				&.active {
					background: var(--primary, #0066cc);
					color: white;
					border-color: var(--primary, #0066cc);
				}
			}
		}
	}
</style>
