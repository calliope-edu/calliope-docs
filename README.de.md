# Calliope Dokumentation

[English](./README.md) | **Deutsch**

**📖 Dokumentation:** [Developer Guide (EN)](./DEVELOPER-README.md) · [Entwickler-Handbuch](./DEVELOPER-README.de.md) · [Helper Tool Guide (EN)](./HELPER-README.md) · [Hilfsprogramm-Anleitung](./HELPER-README.de.md)

---

> 📚 Ein dateibasierter CMS-Ansatz mit SvelteKit und Markdown, der Content von Code trennt und dabei volle Entwickler-Flexibilität bewahrt.

[![Built with SvelteKit](https://img.shields.io/badge/Built%20with-SvelteKit-FF3E00?style=flat&logo=svelte)](https://kit.svelte.dev/)
[![MDsveX](https://img.shields.io/badge/Powered%20by-MDsveX-FF3E00?style=flat)](https://mdsvex.pngwn.io/)

---

## 🎯 Was ist das?

Dies ist die technische Dokumentationsseite für [Calliope mini](https://calliope.cc/) - ein Mikrocontroller-Board für Bildungszwecke. Die Architektur behandelt Markdown-Dateien als dateibasiertes CMS, bei dem:

- **Content-Editoren** nur mit Markdown-Dateien arbeiten - keine `+page.svelte`-Dateien, keine Imports, keine `<script>`- oder `<style>`-Abschnitte
- **Entwickler** die volle SvelteKit-Funktionalität behalten und alles wie gewohnt nutzen können
- **Beide Rollen** klare Grenzen haben, ohne sich gegenseitig einzuschränken

## ✨ Hauptmerkmale

### Für Content-Editoren
- 📝 Schreiben in Markdown ohne `<script>`, `<style>` oder Import-Anweisungen
- 🖼️ Bilder, Videos und Assets direkt bei den Content-Dateien ablegen
- 🌍 Multi-Language-Unterstützung (Deutsch/Englisch)
- 🎨 Svelte-Komponenten direkt in Markdown verwenden (automatisch importiert)
- 🔄 Einfacher Git-basierter Workflow über Hilfsprogramm
- ⚡ **Automatische Bildoptimierung** - Bilder werden zur Build-Zeit automatisch in moderne Formate (WebP/AVIF) konvertiert, skaliert und optimiert - ohne manuelle Arbeit

### Für Entwickler
- 🚀 Volle SvelteKit-Funktionalität bleibt verfügbar
- 🔌 Automatische Komponenten-Injection hält Markdown sauber
- 🖼️ Bildverarbeitung mit Wildcards und EXIF-Metadaten
- 📦 Pre-Build-System kümmert sich um Sitemap und Asset-Management
- 🎭 Mehrschichtiges Template-System via Frontmatter
- 🌐 Paraglide i18n-Integration
- ⚡ Statische Site-Generierung mit Prerendering

## 🏗️ Wie es funktioniert

Das System nutzt mehrere Mechanismen, um die Trennung zu erreichen:

### Eigene MDsveX-Plugins
- **Relative Images** - Transformiert `./image.jpg|w=800` zu optimierten Vite-Imports mit Wildcard-Unterstützung
- **Auto-import Components** - Nutze Svelte-Komponenten in Markdown ohne manuelle Imports
- **Frontmatter Imports** - Verarbeitet Frontmatter-Bild-Referenzen automatisch
- **Template Loader** - Dynamische Template-Injection via Frontmatter

### Pre-Build-System
- **Asset Packing** - Kopiert Content-Assets in den Static-Ordner mit Pfad-Transformationen
- **Sitemap-Generierung** - Erstellt Navigationsstruktur aus der Content-Datei-Hierarchie
- **Multi-Language-Support** - Sprachspezifische Dateiauflösung mit intelligenten Fallbacks

### Smart Routing
- **Catch-all-Routes** - Dynamisches Content-Laden basierend auf Dateistruktur
- **Spracherkennung** - URL-basierte und Browser-basierte Spracherkennung
- **Glob-Imports** - Effizientes Bundling mit Vites `import.meta.glob`

## 🚀 Schnellstart

### Voraussetzungen
- Node.js 16+ 
- npm, pnpm oder yarn

### Installation

```bash
# Repository klonen
git clone https://github.com/calliope-edu/calliope-docs.git
cd calliope-docs

# Dependencies installieren
npm install

# Development-Server starten
npm run dev
```

Die Seite ist dann verfügbar unter `http://localhost:5173`

### Development-Hilfsprogramm (Optional)

Für Content-Editoren bieten wir ein benutzerfreundliches Hilfsprogramm:

**Windows:** Doppelklick auf `Starte-Hilfsprogramm-Windows.cmd`  
**Mac:** Doppelklick auf `Starte-Hilfsprogramm-Mac.command`  
**Linux:** `./Starte-Hilfsprogramm-Linux.sh` ausführen

Dies öffnet eine Web-Oberfläche für Branch-Management, Content-Bearbeitung und Veröffentlichung.

## 📖 Dokumentation

- **[DEVELOPER-README.md (EN)](./DEVELOPER-README.md)** - Umfassendes technisches Architektur-Handbuch für Entwickler (Englisch)
- **[DEVELOPER-README.de.md](./DEVELOPER-README.de.md)** - Umfassendes technisches Architektur-Handbuch für Entwickler (Deutsch)
- **[HELPER-README.en.md (EN)](./HELPER-README.md)** - Anleitung für das Content-Editor-Hilfsprogramm (Englisch)
- **[HELPER-README.md](./HELPER-README.de.md)** - Anleitung für das Content-Editor-Hilfsprogramm (Deutsch)

## 🛠️ Verfügbare Scripts

```bash
npm run dev          # Development-Server mit HMR starten
npm run build        # Für Production bauen
npm run preview      # Production-Build vorschauen
npm run deploy       # Bauen und Sitemap generieren
npm run pack         # Nur Asset-Packing-Script ausführen
npm run storybook    # Storybook-Komponenten-Explorer starten
```

## 📁 Projektstruktur

```
calliope-docs/
├── src/
│   ├── content/           # 📝 Markdown-Content + Assets
│   │   ├── python/        # Python-API-Dokumentation
│   │   ├── tech/          # Technische Dokumentation
│   │   └── ...
│   ├── routes/            # 🛣️ SvelteKit-Routes
│   ├── lib/               # 🧩 Komponenten, Scripts, Templates
│   └── scss/              # 🎨 Globale Styles
├── prebuild/              # 🔨 Pre-Build-Scripts
├── mdsvexplugins/         # 🔌 Eigene MDsveX-Plugins
├── helper/                # 🛠️ Development-Hilfsprogramm
└── static/                # 📦 Statische Assets (Fonts, etc.)
```

## 🌍 Multi-Language-Support

Content-Dateien können sprachspezifisch sein:

```
index.page       # Standard (Fallback, typischerweise Deutsch)
index.de.page    # Deutsche Version
index.en.page    # Englische Version
```

URLs werden automatisch lokalisiert:
- `/python/module/` - Standardsprache
- `/en/python/module/` - Englische Version

## 🎨 Komponenten in Markdown verwenden

Komponenten werden automatisch importiert und können direkt genutzt werden:

```markdown
<Admonition type='tip'>
Das ist ein Tipp!
</Admonition>

<Video src="./demo.mp4" />

<Steps>
<Step>Erster Schritt</Step>
<Step>Zweiter Schritt</Step>
</Steps>
```

## 🖼️ Bilder verwenden

### Einfache Bilder
```markdown
![Alt-Text](./image.jpg)
```

### Mit Optimierung
```markdown
![Alt-Text](./image.jpg|w=800|h=600)
```

### Bildergalerien (Wildcards)
```markdown
![Galerie](./images/*.jpg|w=400)
```

## 🤝 Beitragen

Wir freuen uns über Beiträge! Ob Tippfehler korrigieren, Content hinzufügen oder die Architektur verbessern:

1. Repository forken
2. Feature-Branch erstellen (`git checkout -b feature/tolles-feature`)
3. Änderungen committen (`git commit -m 'Tolles Feature hinzugefügt'`)
4. Zum Branch pushen (`git push origin feature/tolles-feature`)
5. Pull Request öffnen

### Für Content-Editoren
Nutze das Hilfsprogramm (siehe Schnellstart) oder bearbeite Dateien in `/src/content/` direkt.

### Für Entwickler
Siehe [DEVELOPER-README.md](./DEVELOPER-README.md) für Architektur-Details.

## 📄 Lizenz

[Lizenz hier einfügen]

## 🙏 Danksagungen

- Gebaut mit [SvelteKit](https://kit.svelte.dev/)
- Markdown-Verarbeitung via [MDsveX](https://mdsvex.pngwn.io/)
- Internationalisierung via [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- Bildoptimierung via [@sveltejs/enhanced-img](https://kit.svelte.dev/docs/images)

---

**Fragen?** Öffne ein Issue oder schaue in die [Entwickler-Dokumentation](./DEVELOPER-README.md).