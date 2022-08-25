---
title: Pins
description: Der Calliope mini verfügt über diverse Schnittstellen mit unterschiedlichen Protokollen, die programmiert werden können und womit Daten ausgetauscht werden.
template: docs
published: true
---

# {title} 

{description}


## Stromversorgung

### Spannung

- Alle ein und Ausgabe-Pins liefern 3,3 V und werden auch mit 3,3 V betrieben.

::: output admonition type=info
Sensoren die mit 5V betrieben werden, funktionieren in den meisten Fällen nicht.
:::

### Stromstärke

- Der Calliope mini kann bis zu **15 milli Ampere (mA) pro Pin** maximal bereitstellen
- für alle Pins sind es **100 mA insgesamt**

<!-- :::no -->
Schließe niemals mehre Verbraucher, mit 20mA wie z.B. 2 LEDs an einen I/O-Pin an.
<!-- ::: -->

<!-- :::yes -->
Verwendete stattdessen verschiedene I/O Pins oder eine Transistorenschaltung. Beachte, dass ingesamt nicht die 100 mA überschritten werden.
<!-- ::: -->




## Analoge Pins

::: output admonition type=info
In der Signalverarbeitung wird werden Daten verallgemeinert in zwei verschiedenen Formen übertragen: 
- **Digital**: Ein binäres, digitales Signal ist an oder aus, 1 oder 0. Es ist abgestuft, abzählbar und verlustbehaftet (diskrete Werte).
- **Analog**: Ein analoges Signal, dahingegen hat einen zeitlich kontinuierlichen, stufenlosen Verlauf. Es kann theoretisch unendlich viele Werte in einem Wertebereich annehmen.
:::

### Digital Analog-Umsetzer (DAU/DAC)
Der integrierte Digital-Analog-Umsetzer des Calliope mini sorgt dafür, dass die analogen Signale vom Prozessor - der nur digital Signale verarbeiten kann - umgewandelt werden. Die Daten werden in den Bereich **0 - 1023** geschrieben und können auch so in dem jeweiligen Editor oder auch seriell als analoge Werte ausgelesen werden.

### PWM

Um eine LED zu dimmen oder die Geschwindigkeit eines Motors zu varieren, müsste analog die Spannung verändert werden. Der Ausgang der Pins liegt allerdigns immer bei 3,3 V. Mit der Pulsweitenmodulation wird durch schnelles ein und auschalten in unterschiedlicher Periodendauer ein analoges Signal simuliert werden, welches unterschiedliche abgestufte Werte annehmen kann. 

**Wieviele PWM-Pins können parallel verwendet werden?** 
Es können bis zu 3 PWM-Signale gleichzeitig generiert werden, bevor diese anfangen unflüssig und abgestuft zu werden. 


## Pinbelegung
| Chip  | mbed Core | TARGET\_CALLIOPE | DAL                         | Protokoll | Pins     | Info                                              | Digital In/Out | Analog In/OWM out |
| ----- | --------- | ---------------- | --------------------------- | --------- | -------- | ------------------------------------------------- | -------------- | ----------------- |
| P0.00 | p0        | PAD1             | MICROBIT\_PIN\_P12          |           | C0       | Touchpin P0                                       | X              | \-                |
| P0.01 | p1        | PAD2             | MICROBIT\_PIN\_P0           |           | C1       | Touchpin P1                                       | X              | X                 |
| P0.02 | p2        | PAD3             | MICROBIT\_PIN\_P1           |           | C2       | Touchpin P2                                       | X              | X                 |
| P0.03 | p3        | MIC              | MICROBIT\_PIN\_P21          | MIC       | C21      | Microphone pin                                    |                | X                 |
| P0.04 | p4        | COL1             | MICROBIT\_PIN\_P3           |           | C4       | Use only if LED matrix is not initialized         | X              | X                 |
| P0.05 | p5        | COL2             | MICROBIT\_PIN\_P4           |           | C5       | Use only if LED matrix is not initialized         | X              | X                 |
| P0.06 | p6        | COL3             | MICROBIT\_PIN\_P10          |           | C6       | Use only if LED matrix is not initialized         | X              | X                 |
| P0.07 | p7        | COL4             | MICROBIT\_PIN\_P13          | SPI, SCK  | C7       | Use only if LED matrix is not initialized         | X              | \-                |
| P0.08 | p8        | COL5             | MICROBIT\_PIN\_P14          | SPI, MISO | C8       | Use only if LED matrix is not initialized         | X              | \-                |
| P0.09 | p9        | COL6             | MICROBIT\_PIN\_P15          | SPI, MOSI | C9       | Use only if LED matrix is not initialized         | X              | \-                |
| P0.10 | p10       | COL7             | MICROBIT\_PIN\_P9           |           | C10      | Use only if LED matrix is not initialized         | X              | \-                |
| P0.11 | p11       | COL8             | MICROBIT\_PIN\_P7           |           | C11      | Use only if LED matrix is not initialized         | X              | \-                |
| P0.12 | p12       | COL9             | MICROBIT\_PIN\_P6           |           | C12      | Use only if LED matrix is not initialized         | X              | \-                |
| P0.13 | p13       | ROW1             |                             |           |          | Use only if LED matrix is not initialized         | \-             | \-                |
| P0.14 | p14       | ROW2             |                             |           |          | Use only if LED matrix is not initialized         | \-             | \-                |
| P0.15 | p15       | ROW3             |                             |           |          | Use only if LED matrix is not initialized         | \-             | \-                |
| P0.16 | p16       | BUTTON\_B        | MICROBIT\_PIN\_P11          |           |          | B Button                                          |                | \-                |
| P0.17 | p17       | BUTTON\_A        | MICROBIT\_PIN\_P5           |           |          | A Button                                          |                | \-                |
| P0.18 | p18       | RGBLED           | CALLIOPE\_PIN\_RGB\_LED     |           |          | RGB LED data pin                                  |                | \-                |
| P0.19 | p19       | SCL              | MICROBIT\_PIN\_P19          | I²C, SCL  | C19 (A0) | I²C, left Grove connector                         | X              | \-                |
| P0.20 | p20       | SDA              | MICROBIT\_PIN\_P20          | I²C, SDA  | C18 (A0) | I²C, left Grove connector                         | X              | \-                |
| P0.21 | p21       | ACCEL\_INT       | CALLIOPE\_PIN\_ACCEL\_INT   |           |          | BMX055 Accelerator Interrupt pin                  |                | \-                |
| P0.22 | p22       | PAD4             | MICROBIT\_PIN\_P16          |           | C3       | Touchpin P3                                       | X              | \-                |
| P0.23 | p23       |                  |                             |           |          | BMX055 DATARDY (Magnetometer) pin                 | \-             | \-                |
| P0.24 | p24       | USBTX            |                             | USB TX    |          | USB Serial TX                                     |                | \-                |
| P0.25 | p25       | USBRX            |                             | USB RX    |          | USB Serial RX                                     |                | \-                |
| P0.26 | p26       | A\_RX            | MICROBIT\_PIN\_P2           | UART, RX  | C16 (A1) | ext. Serial Port RX (right Grove connector)       | X              | X                 |
| P0.27 | p27       | A\_TX            | MICROBIT\_PIN\_P8           | UART, TX  | C17 (A1) | UART, ext. Serial Port TX (right Grove connector) | X              | X                 |
| P0.28 | p28       | MOTOR\_NSLEEP    | CALLIOPE\_PIN\_MOTOR\_SLEEP |           |          | Motor Port NSLEEP pin                             |                | ?                 |
| P0.29 | p29       | MOTOR\_IN1       | CALLIOPE\_PIN\_MOTOR\_IN1   |           |          | Motor Port IN1 pin                                | \-             | \-                |
| P0.30 | p30       | MOTOR\_IN2       | CALLIOPE\_PIN\_MOTOR\_IN2   |           |          | Motor Port IN2 pin                                | \-             | \-                |

<!-- | C1 | digital | |
| C0 | digital | I/O Pin | 
| C2 | digital/analog | |
| C3 | digital | | -->