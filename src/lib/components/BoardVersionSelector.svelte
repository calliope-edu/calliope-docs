<script>
	import { selectedBoardVersion } from '$lib/scripts/store.js';
	export let dropdown = false;
	const versionen = [1, 2, 3];
</script>

<div>
		{#if dropdown}
			<div class="ui compact tiny menu">
				<div class="ui simple dropdown item">
					Calliope mini {$selectedBoardVersion}
					<i class="dropdown icon" />
					<div class="menu">
						{#each versionen as num}
							<div
								class="item"
								on:click={() => {
									$selectedBoardVersion = num;
								}}
							>
								Calliope mini {num}
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="ui basic buttons">
				{#each versionen as num}
					<button
						class="mini ui compact button"
						on:click={() => {
							$selectedBoardVersion = num;
						}}
						class:active={$selectedBoardVersion == num}
					>
						V{num}
					</button>
				{/each}
			</div>
		{/if}
</div>
