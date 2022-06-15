
<script>

  const libs = ['v2.0', 'v1.3', 'v0.3'];

  let links = libs
    .map(lib => ({ 
      title: lib, 
      href: `/docs/hardware/datenblatt/${lib}`
    }));
</script>

# {$frontmatter.title}

Datenblatt für Calliope mini {$frontmatter.description}.

### Technische Spezifikation
<p>{libs[1]}</p>

| Bauteil/Komponente | Modellbezeichnung | Eigenschaften |
| :------ | :-- | :------------- |
| Prozessor | 32-bit ARM Cortex M0, MKL26Z128VFM4 | 16MHz |
| RAM | [Nordic nRF51822](https://www.nordicsemi.com/products/nrf51822) | 32kB | 
| Bluetooth Low Energy | [Nordic nRF51822](https://www.nordicsemi.com/products/nrf51822) | ulti-protocol Bluetooth® 4.0 low energy
| Funk-Modul | [Nordic nRF51822](https://www.nordicsemi.com/products/nrf51822) |  2.4GHz RF SoC |
| Flash-Speicher | [Nordic nRF51822](https://www.nordicsemi.com/products/nrf51822) | 256kB |
| Flash-Speicher (25 Programme) | ISSI IS25LP | 128Mb/16MB, 166MHZ |
| Beschleunigungssensor | Bosch BMX055 | 3 Achsen (x, y, z) |
| Gyroskop | Bosch BMX055 | 3 Achsen (x, y, z) |
| Magnetometer | Bosch BMX055 | 3 Achsen (x, y, z) |
| 5x5 LED Matrix | - | Farbe rot, Helligkeitssensor |
| MEMS Mikrofon | SPU0410HR5H-PB | -42dB ±3dB bei 94dB SPL, SNR: 59dB |
| DC Motortreiber | TI DRV8837 | Anschluss v. 2 Motoren |
| Piezo-Lautsprecher | - | - |
| RGB-LED | WS2812B | - |
| Taste Reset | PTS810SJ | Neustart |
| 2 Tasten | PTS645S (red/blue) | A und B |
| 2 Grove-Ports | 1125S-SMT-XP | I2C, UART |
| 4 Touchpins / Bananenstecker | - | 3,3 V, analog, digital |
| 17 programmierbare I/O Pins | - | 3,3 V, 4 analog, 17 digital |
| JST Batterieanschluss | S2B-PH-SM4-TB(LF)(SN) | Stromversorgung, 3,3 V |
| USB-Programmierinterface  | PRTR5V0U2F | - |
| USB Micro B Anschluss | 47642-0001 | Stromversorgung und Programmierung | 

[comment]: <> (Warum 8 - 11 IO Pins? Ich zähle mehr, was heißt je nach Softwarkonfiguration? )
[comment]: <> (Ich würde die seriellen Schnittstellen und Protokolle extra behandeln als neuen Unterpunkt)

<!-- - Nordic nRF51822 Multi-protocol Bluetooth® 4.0 low energy/4GHz RF SoC 
- 32-bit ARM Cortex M0 processor (16MHz)
- 32kB RAM
- _256kB Flash
- Bluetooth Low Energy
- Flash Speicher 128Mb, 166MHZ (ISSI IS25LP)
- 5x5 LED Matrix Bildschirm
- Beschleunigungssensor, Gyroskop, Magnetometer (Bosch BMX055)
- MEMS Mikrofon
- DC Motortreiber (TI DRV8837)
- Piezo-Lautsprecher
- Programmierbare RGB LED (WS2812b)
- 2 programmierbare Taster
- Serielle Schnittstelle (USB + konfigurierbare Anschlüsse)
- PWM Ausgabe
- 4 Bananenstecker-/Krokodilklemmenanschlüsse
- 4 Analoge Eingänge
- 8-11 Ein-/Ausgangsanschlüsse (je nach Softwarekonfiguration)
- SPI + I2C
- USB Micro B Anschluss (Programmierung und Stromversorgung)
- JST Batterieanschluss (3.3V)
- Bananen-/Krokodilklemmenanschluss für 3.3V (Ausgang)
- 2 Grove Steckverbinder (I2C + Seriell/Analog)
- NXP KL26z (USB und Stromversorgung)
- Flash-Programmspeicher (optional) -->

:::admonition type="info"
Manche v1.3 minis besitzen bereits wie der v2 mini 32kB RAM.<br>Die Grundausführung sind allerdings 16kB.
:::


<TabbedLinks {links} />


<slot />