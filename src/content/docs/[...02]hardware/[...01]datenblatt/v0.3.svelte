---

title: Datenblätter v0.3, v1.3, v2
description: v0.3

--- 

<script>
import MiniRevSchaltplanPNG from '$img/datenblaetter/Calliope mini rev0.3.3_schaltplan.png';
</script> 

## Allgemeines

Die Revision 0.3 des Calliope mini wurde für den IT Gipfel der Bundesregierung 2016 produziert und an verschiedene Schulen und Tester ausgegeben. Das Gerät ist daran zu erkennen, dass das Calliope mini Logo rechts der 5x5 LED Matrix aufgedruckt ist und die Taster oberhalb der Grove Anschlüsse liegen.  
Weitere Informationen sowie Schaltplan, Blockschaltbild & Pinbelegung fndest du **[Hier](https://calliope-mini.github.io/v03.html)** 

### Schaltplan

[PDF](./datenblaetter/Calliope mini rev0.3.3_schaltplan.pdf)
[PNG](./datenblaetter/Calliope mini rev0.3.3_schaltplan.png)


[SCH](./datenblaetter/Calliope mini rev0.3.3_schaltplan.sch)
[BRD](./datenblaetter/Calliope mini rev0.3.3_schaltplan.brd)

![Calliope mini rev0.3 Schaltplan](./datenblaetter/Calliope mini rev0.3.3_schaltplan.png)

### Software

- Software Repository, enthält die offiziellen Calliope mini Softwareprojekte
- OpenRoberta (online Entwicklungsumgebung)
- MakeCode (online Entwicklungsumgebung)

#### Standard Firmware

- Firmware, Software, die sich im Auslieferungszustand auf dem Gerät befindet.
- Bootloader, Software, die auf dem Interface-Chip läuft und für den Fall aufgespielt wird, wenn sich der Calliope mini nicht mehr mit dem Laufwerk MINI anmeldet.

### Errata / Fehler

- Entgegen der Dokumentation sind auf einigen Boards die Farben der Taster A und B vertauscht.
    - Max. 200 Boards, der Rest wurde noch in der Produktion korrigiert
- In frühen Dokumentationen sind die Anschlüsse P0 und P3 als Analog gekennzeichnet. Das ist nicht korrekt, nur die Anschlüsse P1 und P2 der Eckanschlüsse können als Analoge Eingänge benutzt werden.
    - Hier ist keine Korrektur möglich.
- Die serielle Kommunikation funktioniert in Richtung PC, aber nicht vom PC zum Calliope mini, da Widerstände (R38, R39) nicht korrekt dimensioniert waren (10kΩ statt 1kΩ).
    - Korrektur durch Abschalten der Pull-Up Widerstände im nRF51: USBRX (pin_mode(USBRX, PullNone)). Korrigiert in der microbit-DAL v1.0.3, oder
    - Korrektur durch eine Änderung auf dem Board.