---
title: Bauteile
description: Good description of topic
template: docs
published: true
---

# {title} 

## Motortreiber (DRV8837)

Auf dem Calliope mini ist ein Motortreiber verbaut, der Motoren bis zu 9V versorgen über eine externe Stromversorgung steuern kann. Der Motortreiber ist eine H-Brücken Transistorenschaltung, welche die Polarität des Stromkreises ändern kann und so verschiedenen Modi des Motors, wie Vorwärts-, Rückwärtsfahren, Bremsen und Leerlauf realisiert. Der Motortreiber ist so konzipiert, dass dieser als Vollbrücke einen Motor Vorwärts- und Rückwärts bewegen kann. Für zwei Motoren wird diese in zwei Halbbrücken aufgeteilt und es können die Motoren nicht unabhängig voneinander entgegengesetzt, beziehungsweise rückwärts bewegt werden.

Genauere Informationen können aus dem Datenblatt entnommen werden:
<a href="https://www.ti.com/lit/ds/symlink/drv8837.pdf?ts=1654067963185&ref_url=https%253A%252F%252Fwww.google.com%252F" target="_blank">Datenblatt: DRV8837</a>

### Motorzustände und Wahrheitstabelle


**2 Motoren**

<table id="t1">
<tbody>
<tr>
<td>IN1</td>
<td>IN2</td>
<td>OUT1</td>
<td>OUT2 </td>
<td>Modus</td>
</tr>
<tr>
<td>0</td>
<td>0</td>
<td>Z</td>
<td>Z</td>
<td>Leerlauf</td>
</tr>
<tr>
<td>0</td>
<td>1</td>
<td>L</td>
<td>H</td>
<td>Rückwärts</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>H</td>
<td>L</td>
<td>Vorwärts</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>L</td>
<td>L</td>
<td>Bremsen</td>
</tr>
</tbody></table>


**1 Motor**

<table id="t1">
<tbody>
<tr>
<td>IN1</td>
<td>IN2</td>
<td>OUT1</td>
<td>OUT2 </td>
<td>Motor1</td>
<td>Motor2</td>
</tr>
<tr>
<td>0</td>
<td>0</td>
<td>Z</td>
<td>Z</td>
<td>Bremsen</td>
<td>Bremsen</td>
</tr>
<tr>
<td>0</td>
<td>1</td>
<td>L</td>
<td>H</td>
<td>Beschleunigen</td>
<td>Bremsen</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>H</td>
<td>L</td>
<td>Bremsen</td>
<td>Beschleunigen</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>L</td>
<td>L</td>
<td>Vorwärts</td>
<td>Vorwärts</td>
</tr>
</tbody></table>


*H = High-Side-Schalter an, L = Low-Side-Schalter an, Z = Beide Schalter aus*
