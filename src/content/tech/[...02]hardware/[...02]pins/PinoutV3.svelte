<script>
	let pins = [
        { name: 'VCC', function: null, analogin: null, interface: null, color: '#E6007D' },
        { name: 'P1', function: 'PAD1', analogin: 'AnalogIn', interface: 'Touch', color: '#3FC863' },
        { name: 'P3', function: 'PAD3', analogin: null, interface: 'Touch', color: '#3FC863' },
        { name: 'C5', function: 'Button A', analogin: null, interface: null, color: '#42C9C9' },
        { name: 'C7', function: 'Display Spalte 2', analogin: null, interface: null, color: '#42C9C9' },
        { name: 'C9', function: null, analogin: null, interface: null, color: '#3FC863' },
        { name: 'C11', function: 'Button B', analogin: null, interface: null, color: '#42C9C9' },
        { name: 'C13', function: null, analogin: null, interface: 'SPI CLOCK', color: '#3FC863' },
        { name: 'C15', function: null, analogin: null, interface: 'SPI MOSI', color: '#3FC863' },
        {
			name: 'C17',
			function: 'Grove A1 TX',
			analogin: null,
			interface: 'UART TX',
			color: '#42C9C9'
		},
        {
			name: 'C19',
			function: 'Grove A0 SCL',
			analogin: null,
			interface: 'I2C SCL',
			color: '#42C9C9'
		},
        { name: 'GND', function: null, analogin: null, interface: null, color: '#044854' },
        { name: 'M1+', function: null, analogin: null, interface: null, color: '#3FC863' },
        { name: 'M1-', function: null, analogin: null, interface: null, color: '#3FC863' },
        { name: 'GND', function: null, analogin: null, interface: null, color: '#044854' },

        { name: 'GND', function: null, analogin: null, interface: null, color: '#044854' },
		{ name: 'P0', function: 'PAD0', analogin: 'AnalogIn', interface: 'Touch', color: '#3FC863' },
		{ name: 'P2', function: 'PAD2', analogin: 'AnalogIn', interface: 'Touch', color: '#3FC863' },
		{
			name: 'C4',
			function: 'Display Spalte 1',
			analogin: 'AnalogIn',
			interface: null,
			color: '#42C9C9'
		},
		{ name: 'C6', function: 'Display Spalte 4', analogin: null, interface: null, color: '#42C9C9' },
		{ name: 'C8', function: null, analogin: null, interface: null, color: '#3FC863' },
		{
			name: 'C10',
			function: 'Display Spalte 5',
			analogin: 'AnalogIn',
			interface: null,
			color: '#42C9C9'
		},
		{
			name: 'C12',
			function: 'ACCESSIBILITY',
			analogin: null,
			interface: '(JACDAC)',
			color: '#42C9C9'
		},
		{ name: 'C14', function: null, analogin: null, interface: 'SPI MISO', color: '#3FC863' },
		{
			name: 'C16',
			function: 'Grove A1 RX',
			analogin: 'AnalogIn',
			interface: 'UART RX',
			color: '#42C9C9'
		},
		{
			name: 'C18',
			function: 'Display Spalte 3',
			analogin: 'AnalogIn',
			interface: null,
			color: '#42C9C9'
		},
		{
			name: 'C20',
			function: 'Grove A0 SDA',
			analogin: null,
			interface: 'I2C SDA',
			color: '#42C9C9'
		},
		{ name: 'M0+', function: null, analogin: null, interface: null, color: '#3FC863' },
		{ name: 'M0-', function: null, analogin: null, interface: null, color: '#3FC863' },
        { name: 'VM', function: null, analogin: null, interface: null, color: '#E6007D' },
		
	];

	let activePin = null;
	function toggleVisibility(pin) {
		activePin = activePin === pin ? null : pin;
	}
</script>

<nav class="pinout">
	<ul>
		{#each pins as pin, index}
			<li on:click={() => toggleVisibility(pin)}>
				<div class="dot" style="background-color:{pin.state === 'hidden' ? 'white' : pin.color}">
					{pin.name}
				</div>
				{#if pin.function}
					<div class="tag {index > 15 ? 'down' : 'up'}">{pin.function}</div>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

{#if activePin}
	<h3>{activePin.name}</h3>
	{#if activePin.interface}
		<p>Der Pin {activePin.name} benutzt die Schnittstelle {activePin.interface}.</p>
	{/if}
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
</style>
