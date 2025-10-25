# 🚀 Development Helper

[English](./HELPER-README.md) | **Deutsch**

Ein benutzerfreundliches Hilfsprogramm für die Bearbeitung von Website-Inhalten mit Git-Integration, automatischem Dev-Server und vereinfachtem Workflow.

## 📋 Was ist der Development Helper?

Der Development Helper ist ein interaktives Tool, das dir hilft:

- **Branches** einfach zu erstellen und zu wechseln
- Den **Dev-Server** automatisch zu starten
- **Änderungen** zu verfolgen und zu speichern
- **Inhalte zu veröffentlichen** mit einem Klick
- **Merge-Konflikte** zu vermeiden

Alles über eine übersichtliche Web-Oberfläche – **keine Terminal-Befehle nötig**!

---

## 🎯 Schnellstart

### Windows

1. **Doppelklick** auf `Starte-Hilfsprogramm-Windows.cmd`
2. Browser öffnet sich automatisch
3. Fertig! 🎉

### Mac

1. **Doppelklick** auf `Starte-Hilfsprogramm-Mac.command`
2. Beim ersten Mal: Rechtsklick → "Öffnen" (Sicherheitsabfrage)
3. Browser öffnet sich automatisch
4. Fertig! 🎉

### Linux

1. Öffne das Terminal im Projektordner
2. Führe aus: `./Starte-Hilfsprogramm-Linux.sh`
3. Browser öffnet sich automatisch
4. Fertig! 🎉

---

## 📦 Voraussetzungen

Der Development Helper benötigt folgende Software:

### ✅ **Node.js** (erforderlich)
- **Version:** 16 oder höher empfohlen
- **Download:** [nodejs.org](https://nodejs.org/)
- **Enthält:** Node.js und npm (Paketmanager)

### ✅ **Git** (empfohlen)
- **Download:** [git-scm.com](https://git-scm.com/)
- **Hinweis:** Wird für Branch-Management und Veröffentlichung benötigt

### ℹ️ Automatische Prüfung

Die Start-Skripte prüfen automatisch, ob alle nötigen Programme installiert sind und zeigen hilfreiche Installationsanleitungen an.

---

## 🔧 Installation der Abhängigkeiten

### Windows

#### Node.js installieren:
1. Besuche [nodejs.org](https://nodejs.org/)
2. Lade die **LTS-Version** herunter (Empfohlen)
3. Führe den Installer aus
4. Starte den Computer neu (optional, aber empfohlen)

#### Git installieren:
1. Besuche [git-scm.com/download/win](https://git-scm.com/download/win)
2. Lade den Installer herunter
3. Führe den Installer aus (Standard-Einstellungen sind OK)

#### Prüfen, ob alles funktioniert:
```cmd
node --version
npm --version
git --version
```

---

### Mac

#### Node.js installieren:
1. Besuche [nodejs.org](https://nodejs.org/)
2. Lade die **LTS-Version** herunter
3. Führe den Installer aus

**Alternative mit Homebrew:**
```bash
brew install node
```

#### Git installieren:
Git ist oft schon vorinstalliert. Prüfe mit:
```bash
git --version
```

Falls nicht installiert:
```bash
xcode-select --install
```

Oder mit Homebrew:
```bash
brew install git
```

#### Datei ausführbar machen:
```bash
chmod +x Starte-Hilfsprogramm-Mac.command
```

---

### Linux

#### Node.js und npm installieren:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Fedora:**
```bash
sudo dnf install nodejs npm
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
```

#### Git installieren:

**Ubuntu/Debian:**
```bash
sudo apt install git
```

**Fedora:**
```bash
sudo dnf install git
```

**Arch Linux:**
```bash
sudo pacman -S git
```

#### Datei ausführbar machen:
```bash
chmod +x Starte-Hilfsprogramm-Linux.sh
```

---

## 🎨 So funktioniert der Helper

### 1️⃣ **Branch auswählen**
- Erstelle einen neuen Branch für deine Änderungen
- Oder wähle einen bestehenden Branch aus
- Sieh dir die Git-Historie visuell an

### 2️⃣ **Dependencies prüfen**
- Der Helper prüft, ob npm-Pakete installiert sind
- Bei Bedarf: Installiere mit einem Klick

### 3️⃣ **Arbeiten & Bearbeiten**
- Der Dev-Server startet automatisch
- Öffne den Browser auf `http://localhost:5173`
- Bearbeite Inhalte im `src/content` Ordner
- Sieh Änderungen live im Browser

### 4️⃣ **Speichern & Veröffentlichen**
- Sieh alle geänderten Dateien auf einen Blick
- Gib eine Commit-Nachricht ein (wird vorgeschlagen)
- **Nur speichern:** Änderungen im Branch speichern
- **Speichern & veröffentlichen:** Automatisch in den Branch **PRODUCTION** mergen

---

## 📚 Storybook

- Start: In Seite „Development“ → Abschnitt „Storybook“ → „Start Storybook“
- Öffnen: „Im Browser öffnen“ (http://localhost:6006)
- Build: „Build Storybook“ erzeugt einen statischen Build im Ordner `storybook-static/`

Erforderlich: Abhängigkeiten installiert (`npm ci`) – bereits über Seite „Dependencies“ möglich.

---

## 🔍 Fehlerbehebung

### "Node.js ist nicht installiert"
→ Installiere Node.js von [nodejs.org](https://nodejs.org/)

### "npm ist nicht installiert"
→ npm wird mit Node.js installiert. Installiere Node.js neu.

### "Git ist nicht installiert"
→ Installiere Git von [git-scm.com](https://git-scm.com/)

### "Permission denied" (Mac/Linux)
→ Mache die Datei ausführbar:
```bash
chmod +x Starte-Hilfsprogramm-*.sh
chmod +x Starte-Hilfsprogramm-*.command
```

### "Dev-Server startet nicht"
→ Prüfe, ob Port 5173 bereits belegt ist:
```bash
# Mac/Linux
lsof -i :5173

# Windows
netstat -ano | findstr :5173
```

### Browser öffnet sich nicht automatisch
→ Öffne manuell: `http://localhost:8080`

---

## 🛠️ Erweiterte Nutzung

### Helper im Hintergrund ausführen

Wenn du den Helper im Hintergrund laufen lassen möchtest:

**Windows:** Minimiere einfach das CMD-Fenster

**Mac/Linux:**
```bash
# Mit nohup im Hintergrund starten
nohup ./Starte-Hilfsprogramm-Linux.sh &
```

### Helper beenden

**Windows:** Schließe das CMD-Fenster oder drücke `Strg+C`

**Mac/Linux:** Drücke `Ctrl+C` im Terminal

---

## 📂 Projekt-Struktur

```
website-tinysuperlab/
├── helper/                    # Helper-Backend
│   ├── server.js              # HTTP-Server
│   ├── api.js                 # API-Endpunkte
│   ├── utils.js               # Hilfsfunktionen
│   └── index.html             # Web-Interface
├── src/
│   └── content/               # Bearbeitbare Inhalte
├── Starte-Hilfsprogramm-Windows.cmd
├── Starte-Hilfsprogramm-Mac.command
└── Starte-Hilfsprogramm-Linux.sh
```

---

## 🌐 Technische Details

- **Server:** Node.js HTTP-Server auf Port 8080
- **Dev-Server:** Vite auf Port 5173
- **Git-Integration:** Branch-Management, Commits, Merge
- **UI:** Vanilla JavaScript, moderne CSS (shadcn-inspiriert)

---

## 💡 Tipps

1. **Branch-Namen:** Verwende beschreibende Namen wie `update-2025-10-24`
2. **Commit-Nachrichten:** Sei spezifisch: "Update Produktseite MotionKit1"
3. **Regelmäßig speichern:** Sichere deine Arbeit durch regelmäßige Commits
4. **Nur veröffentlichen wenn fertig:** Nutze "Nur speichern" für Zwischenstände

---

## 🆘 Support

Bei Problemen oder Fragen:

1. Prüfe die [Fehlerbehebung](#-fehlerbehebung) oben
2. Stelle sicher, dass alle Voraussetzungen erfüllt sind
3. Kontaktiere das Entwickler-Team

---

## 📄 Lizenz

Internes Tool für das TinySuperLab-Projekt.

---

**Viel Erfolg beim Bearbeiten! 🚀**
