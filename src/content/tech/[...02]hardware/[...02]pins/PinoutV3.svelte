<script>
	import Button from "$lib/components/elements/Button.svelte";
	import Admonition from "$lib/components/elements/Admonition.svelte";

	let pins = [
        { name: 'VCC', fullName: 'Stromversorgung VCC', description: '', function: null, analogin: null, interface: null, color: '#E6007D', unassignedIO: false },
        { name: 'P1', fullName: 'Touch Pin ', description: '', function: 'PAD1', analogin: true, interface: 'Touch', color: '#3FC863', unassignedIO: true },
        { name: 'P3', fullName: 'Touch Pin', description: '', function: 'PAD3', analogin: null, interface: 'Touch', color: '#3FC863', unassignedIO: true },
        { name: 'C5', fullName: 'Taste A', description: '', function: 'Button A', analogin: null, interface: null, color: '#42C9C9', unassignedIO: false },
        { name: 'C7', fullName: 'Display Spalte 2', description: '', function: 'Display Spalte 2', analogin: null, interface: null, color: '#42C9C9', unassignedIO: false },
        { name: 'C9', fullName: 'Allgemeiner I/O Pin', description: '', function: null, analogin: null, interface: null, color: '#3FC863', unassignedIO: true },
        { name: 'C11', fullName: 'Taste B', description: '', function: 'Button B', analogin: null, interface: null, color: '#42C9C9', unassignedIO: false },
        { name: 'C13', fullName: 'SPI Takt', description: '', function: null, analogin: null, interface: 'SPI CLOCK', color: '#3FC863', unassignedIO: true },
        { name: 'C15', fullName: 'SPI MOSI', description: '', function: null, analogin: null, interface: 'SPI MOSI', color: '#3FC863', unassignedIO: true },
        {
			name: 'C17', fullName: 'UART TX (Grove A1 TX)',
			function: 'Grove A1 TX',
			analogin: null,
			interface: 'UART TX',
			color: '#42C9C9'
		},
        {
			name: 'C19', fullName: 'I2C SCL (Grove A0 SCL)',
			function: 'Grove A0 SCL',
			analogin: null,
			interface: 'I2C SCL',
			color: '#42C9C9'
		},
        { name: 'GND', fullName: 'Masse', description: '', function: null, analogin: null, interface: null, color: '#044854', unassignedIO: false },
        { name: 'M1+', fullName: 'Motortreiber Ausgang +', description: '', function: "Pluspol Motor 1", analogin: null, interface: null, color: '#3FC863', unassignedIO: true },
        { name: 'M1-', fullName: 'Motortreiber Ausgang -', description: '', function: "Minuspol Motor 1", analogin: null, interface: null, color: '#3FC863', unassignedIO: true },
        { name: 'GND', fullName: 'Masse (GND)', description: '', function: null, analogin: null, interface: null, color: '#044854', unassignedIO: false },

        { name: 'GND', fullName: 'Masse (GND)', description: '', function: null, analogin: null, interface: null, color: '#044854', unassignedIO: false },
		{ name: 'P0', fullName: 'Touch Pin', description: '', function: 'PAD0', analogin: true, interface: 'Touch', color: '#3FC863', unassignedIO: true },
		{ name: 'P2', fullName: 'Touch Pin', description: '', function: 'PAD2', analogin: true, interface: 'Touch', color: '#3FC863', unassignedIO: true },
		{
			name: 'C4', fullName: 'Display Spalte 1',
			function: 'Display Spalte 1',
			analogin: true,
			interface: null,
			color: '#42C9C9'
		},
		{ name: 'C6', fullName: 'Display Spalte 4', description: '', function: 'Display Spalte 4', analogin: null, interface: null, color: '#42C9C9', unassignedIO: false },
		{ name: 'C8', fullName: 'Allgemeiner I/O Pin', description: '', function: null, analogin: null, interface: null, color: '#3FC863', unassignedIO: true },
		{
			name: 'C10', fullName: 'Display Spalte 5',
			function: 'Display Spalte 5',
			analogin: true,
			interface: null,
			color: '#42C9C9'
		},
		{
			name: 'C12', fullName: 'JACDAC & Barrierefreiheit',
			function: 'ACCESSIBILITY',
			analogin: null,
			interface: 'JACDAC',
			color: '#42C9C9'
		},
		{ name: 'C14', fullName: 'SPI MISO', description: '', function: null, analogin: null, interface: 'SPI MISO', color: '#3FC863', unassignedIO: true },
		{
			name: 'C16', fullName: 'UART RX (Grove A1 RX)',
			function: 'Grove A1 RX',
			analogin: true,
			interface: 'UART RX',
			color: '#42C9C9'
		},
		{
			name: 'C18', fullName: 'Display Spalte 3',
			function: 'Display Spalte 3',
			analogin: true,
			interface: null,
			color: '#42C9C9'
		},
		{
			name: 'C20', fullName: ' I2C SDA (Grove A0 SDA)',
			function: 'Grove A0 SDA',
			analogin: null,
			interface: 'I2C SDA',
			color: '#42C9C9'
		},
		{ name: 'M0+', fullName: 'Motortreiber Ausgang +', description: '', function: "Pluspol Motor 0", analogin: null, interface: null, color: '#3FC863', unassignedIO: true },
		{ name: 'M0-', fullName: 'Motortreiber Ausgang -', description: '', function: "Minuspol Motor 0", analogin: null, interface: null, color: '#3FC863', unassignedIO: true },
        { name: 'VM', fullName: 'Motor Stromversorgung', description: '', function: null, analogin: null, interface: null, color: '#E6007D', unassignedIO: false },
	];
	let viewMode = 'function'; // Default to "function" view

	let activePin = null;
	function toggleVisibility(pin) {
		activePin = activePin === pin ? null : pin;
	}
	
</script>


<Button color="calliope"
        type={(viewMode) != 'function' ? 'border' : 'default'}
        on:click={()=>{viewMode='function'}}
        text="Funktion"
/>
<Button color="calliope" 
        type={(viewMode) != 'interface' ? 'border' : 'default'} 
        on:click={()=>{viewMode='interface'}}
        text="Schnittstelle"
/>

<nav class="pinout">
	<ul>
		{#each pins as pin, index}
			<li on:click={() => toggleVisibility(pin)}>
				<div class="dot" class:analogin_dot={pin.analogin} style="background-color:{pin.state === 'hidden' ? 'white' : pin.color}">
					{pin.name}
				</div>
				{#if (pin.function && viewMode === 'function') || (pin.interface && viewMode === 'interface')}
					<div class="tag" class:down={index > 15} class:up={index <= 15}>
						{#if viewMode === 'function'}
                        	{pin.function}    
						{:else if viewMode === 'interface'}     
							{pin.interface}
						{/if}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<div class="legende">
	<div style="color: var(--color-blau);">
		<div class="color-bar"></div> 
		<span >Analog lesen</span>
	</div>

	<div style="color: var(--color-calliope);">
		<div class="color-bar"></div> 
		<span >unbelegte I/O Pins</span>
	</div>

	<div style="color: var(--color-rosa);">
		<div class="color-bar"></div> 
		<span >Stromversorgung</span>
	</div>

	<div style="color: #044854;">
		<div class="color-bar"></div> 
		<span >Masse</span>
	</div>
</div>

{#if activePin}
	<Admonition title="Ausgewählter Pin">
		<h3>{activePin.fullName}</h3>
		{#if activePin.description}
			<p>{activePin.description}</p>
		{/if}
	</Admonition>
{/if}

<style>
	.pinout {
		background-color: #1E1E21;
		width: 100%;
		position: relative;
		margin: 10em 0em;
        padding: 1em;
        border-radius: .5em;
	}

	.pinout ul {
        display: grid;
        grid-template-columns: repeat(15, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        margin: 0;
        padding: 0;
		list-style: none;
	}

	.pinout ul li .tag {
		position: absolute;
        
        max-width: 8em;
		text-wrap: nowrap;
		border: 1px solid;
	}

	.pinout ul li .tag.up {
        bottom:100%;
        left: 50%;
		transform-origin: center left;
		margin-top: -0%;
		transform: rotateZ(-90deg);
        border-radius: 0px 30px 30px 0px;
        padding: 0px 8px 0px 4px;
	}
	.pinout ul li .tag.down {
        top:100%;
		transform-origin: center right;
        right: 50%;
		margin-top: 0%;
		transform: rotateZ(-90deg);
        padding: 0px 4px 0px 8px;
        border-radius: 30px 0px 0px 30px;
	}
	.pinout li {
		cursor: pointer;
		list-style: none;
		margin: 0px;
		position: relative;
	}

	.pinout li .dot {
		margin: auto;
		width: 35px;
		height: 35px;
		border-radius: 40px;
		background-color: #3FC863;
		text-align: center;
		color: white;
		display: flex;
        align-items: center;
        justify-content: center;
	}

	.pinout li .dot span {
		color: white;
		text-align: center;
	}

	.pinout li .dot:hover {
        opacity: .9;
	}


	.analogin_dot {
		/* width: 30px; */
		/* display: inline-block; */
		/* margin-bottom: -10px; */
		/* height: 30px; */
		/* padding-top: 30px; */
		/* font-weight: bold; */
		/* padding-top: 6px; */
		/* border-radius: 30px; */
		border: 2px solid var(--color-blau);
	}
	.legende {
		display: flex;
		gap: 1rem;
	}

	.legende .color-bar {
		border: 3px solid currentColor;
	}
</style>
