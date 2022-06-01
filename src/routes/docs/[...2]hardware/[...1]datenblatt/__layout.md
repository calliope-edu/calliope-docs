
# {$frontmatter.title}

Datenblatt für Calliope mini {$frontmatter.description}.

Hier Tabelle Vergleich

<script>

  const libs = ['v2', 'v1.3', 'v0.3'];

  let links = libs
    .map(lib => ({ 
      title: lib, 
      href: `/docs/hardware/datenblatt/${lib}` 
    }));
</script>

<TabbedLinks {links} />

### Technische Spezifikation

| Bauteil/Komponente | Modellbezeichnung | Eigenschaften |
| :------ | :-- | :------------- |
| Prozessor | 32-bit ARM Cortex M0, MKL26Z128VFM4 | 16MHz |
| RAM (Prozessor) | [Nordic nRF51822](https://www.nordicsemi.com/products/nrf51822) | 32kB |
| Bluetooth Low Energy (Prozessor) | [Nordic nRF51822](https://www.nordicsemi.com/products/nrf51822) | ulti-protocol Bluetooth® 4.0 low energy
| Funk-Modul (Prozessor) | [Nordic nRF51822](https://www.nordicsemi.com/products/nrf51822) |  2.4GHz RF SoC |
| Flash-Speicher (Prozessor) | [Nordic nRF51822](https://www.nordicsemi.com/products/nrf51822) | 256kB |
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
| 8-11 I/O Pins | - | 3,3 V, 4 analog, ? digital |
| JST Batterieanschluss | S2B-PH-SM4-TB(LF)(SN) | Stromversorgung, 3,3 V |
| USB-Programmierinterface  | PRTR5V0U2F | - |
| USB Micro B Anschluss | 47642-0001 | Stromversorgung und Programmierung | 

[comment]: <> (Warum 8 - 11 IO Pins? Ich zähle mehr, was heißt je nach Softwarkonfiguration? )
[comment]: <> (Ich würde die seriellen Schnittstellen und Protokolle extra behandeln als neuen Unterpunkt)

----

<slot />

----

### Software

- Software Repository, enthält die offiziellen Calliope mini Softwareprojekte
- OpenRoberta (online Entwicklungsumgebung)
- MakeCode (online Entwicklungsumgebung)

#### Standard Firmware

- Firmware, Software, die sich im Auslieferungszustand auf dem Gerät befindet.
- Bootloader, Software, die auf dem Interface-Chip läuft und für den Fall aufgespielt wird, wenn sich der Calliope mini nicht mehr mit dem Laufwerk MINI anmeldet.