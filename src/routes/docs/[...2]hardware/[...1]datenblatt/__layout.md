
# {$frontmatter.title}

Datenblatt für Calliope mini. Für Details zu den einzelnen Modellen bitte runterscrollen.

### Technische Spezifikation

<table>
    <thead>
        <tr>
          <th>Bauteil/Komponente</th>
          <th>v2</th>
          <th>v1.3</th>
          <th>v0.3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <th>Prozessor</th>
          <td colspan="3">32-bit ARM Cortex M0</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">MKL26Z128VFM4</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">16MHz</td>
        </tr>
        <tr>
          <th>RAM (Prozessor)</th>
          <td colspan="3">Nordic nRF51822</td>
        </tr>
        <tr>
          <th></th>
          <td>32kB</td>
          <td colspan="2">16kb</td>
        </tr>
        <tr>
          <th>Bluetooth Low Energy (Prozessor)</th>
          <td colspan="3">Nordic nRF51822</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">multi-protocol Bluetooth® 4.0 low energy</td>
        </tr>
         <tr>
          <th>Funk-Modul (Prozessor)</th>
          <td colspan="3">Nordic nRF51822</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">2.4GHz RF SoC</td>
        </tr>
        <tr>
          <th>Funk-Modul (Prozessor)</th>
          <td colspan="3">Nordic nRF51822</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">2.4GHz RF SoC</td>
        </tr>
        <tr>
          <th>Flash-Speicher (Prozessor)</th>
          <td colspan="3">Nordic nRF51822</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">256kB</td>
        </tr>
        <tr>
          <th>Flash-Speicher (25 Programme)</th>
          <td>ISSI IS25LP</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <th></th>
          <td>128Mb/16MB, 166MHZ</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <th>Beschleunigungssensor</th>
          <td colspan="3">Bosch BMX055</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">3 Achsen (x, y, z)</td>
        </tr>
        <tr>
          <th>Gyroskop</th>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">3 Achsen (x, y, z)</td>
        </tr>
        <tr>
          <th>Magnetometer</th>
          <td colspan="3">Bosch BMX055</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">3 Achsen (x, y, z)</td>
        </tr>
         <tr>
          <th>5x5 LED Matrix</th>
          <td colspan="3">Farbe: rot, Helligkeitssensor</td>
        </tr><tr>
          <th>MEMS Mikrofon</th>
          <td colspan="3">SPU0410HR5H-PB</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">-42dB ±3dB bei 94dB SPL, SNR: 59dB</td>
        </tr>
        <tr>
          <th>DC Motortreiber</th>
          <td colspan="3">TI DRV8837</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">Anschluss v. 2 Motoren</td>
        </tr>
        <tr>
          <th>Piezo-Lautsprecher</th>
          <td>-</td>
        </tr>
        <tr>
          <th>RGB-LED</th>
          <td>WS2812B</td>
        </tr>
        <tr>
          <th>Taste Reset</th>
          <td colspan="3">PTS810SJ</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">Neustart</td>
        </tr>
        <tr>
          <th>2 Tasten</th>
          <td colspan="3">PTS645S (rot/blau)</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">A und B</td>
        </tr>
        <tr>
          <th>2 Grove-Ports</th>
          <td colspan="3">1125S-SMT-XP</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="2">I2C, UART</td>
          <td>I2C, Seriell</td>
        </tr>
        <tr>
          <th>4 Touchpins / Bananenstecker</th>
          <td colspan="2">3,3 V, analog, digital</td>
          <td>3,3 V, Ausgang</td>
        </tr>
        <tr>
          <th>8-11 I/O Pins	</th>
          <td>3,3 V, 4 analog, ? digital</td>
        </tr>
        <tr>
          <th>JST Batterieanschluss</th>
          <td>S2B-PH-SM4-TB(LF)(SN)</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">Stromversorgung, 3,3 V</td>
        </tr>
        <tr>
          <th>USB-Programmierinterface	</th>
          <td>PRTR5V0U2F</td>
        </tr>
        <tr>
          <th>USB Micro B Anschluss	</th>
          <td>47642-0001</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="3">Stromversorgung und Programmierung	</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
        </tr>
        <tr>
          <td colspan="3"></td>
        </tr>
    </tfoot>
</table>

<script>

  const libs = ['v2.0', 'v1.3', 'v0.3'];

  let links = libs
    .map(lib => ({ 
      title: lib, 
      href: `/docs/hardware/datenblatt/${lib}`
    }));
</script>


:::admonition type="info"
Manche v1.3 minis besitzen bereits wie der v2 mini 32kB RAM.<br>Die Grundausführung sind allerdings 16kB.
:::

### Wähle hier das mini - Modell aus:
<TabbedLinks {links} />

<slot />
