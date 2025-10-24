#!/bin/bash
# ========================================
# Development Helper für Mac
# ========================================
# Doppelklick auf diese Datei, um den
# interaktiven Development Helper zu starten.

# Change to script directory
cd "$(dirname "$0")" || exit 1

echo ""
echo "========================================"
echo "  Development Helper"
echo "========================================"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to show macOS dialog
show_dialog() {
    osascript -e "tell app \"System Events\" to display dialog \"$1\" buttons {\"OK\"} default button 1 with title \"Development Helper\""
}

# Function to show choice dialog
show_choice_dialog() {
    osascript -e "tell app \"System Events\" to display dialog \"$1\" buttons {\"Abbrechen\", \"Öffnen\"} default button 2 with title \"Development Helper\"" 2>/dev/null
}

# Check if Node.js is installed
if ! command_exists node; then
    echo "[FEHLER] Node.js ist nicht installiert!"
    echo ""
    echo "Der Development Helper benötigt Node.js."
    echo ""
    echo "INSTALLATION:"
    echo "  1. Besuche: https://nodejs.org/"
    echo "  2. Lade die LTS-Version herunter"
    echo "  3. Installiere Node.js"
    echo "  4. Starte dieses Programm erneut"
    echo ""
    
    # Ask if user wants to open download page
    if show_choice_dialog "Node.js ist nicht installiert!\n\nDer Helper benötigt Node.js.\n\nMöchtest du die Download-Seite öffnen?"; then
        open "https://nodejs.org/"
    fi
    
    exit 1
fi

echo "[OK] Node.js ist installiert"
NODE_VERSION=$(node --version)
echo "    Version: $NODE_VERSION"
echo ""

# Check if npm is available
if ! command_exists npm; then
    echo "[FEHLER] npm ist nicht installiert!"
    echo "npm sollte normalerweise mit Node.js installiert werden."
    echo "Bitte installiere Node.js neu von https://nodejs.org/"
    echo ""
    show_dialog "npm ist nicht installiert!\n\nBitte installiere Node.js neu von:\nhttps://nodejs.org/"
    exit 1
fi

echo "[OK] npm ist installiert"
NPM_VERSION=$(npm --version)
echo "    Version: $NPM_VERSION"
echo ""

# Check if Git is installed
if ! command_exists git; then
    echo "[WARNUNG] Git ist nicht installiert!"
    echo ""
    echo "Git wird für einige Funktionen benötigt."
    echo ""
    echo "INSTALLATION:"
    echo "  Für macOS: Installiere Xcode Command Line Tools"
    echo "  Terminal-Befehl: xcode-select --install"
    echo "  Oder besuche: https://git-scm.com/"
    echo ""
    
    # Ask if user wants to install Xcode tools
    if show_choice_dialog "Git ist nicht installiert!\n\nMöchtest du die Xcode Command Line Tools installieren?"; then
        xcode-select --install
    fi
    
    echo "Möchtest du trotzdem fortfahren? (j/n)"
    read -r CONTINUE
    if [[ ! "$CONTINUE" =~ ^[jJ]$ ]]; then
        exit 1
    fi
else
    echo "[OK] Git ist installiert"
    GIT_VERSION=$(git --version)
    echo "    $GIT_VERSION"
fi

echo ""
echo "========================================"
echo "  Helper wird gestartet..."
echo "========================================"
echo ""
echo "Der Browser öffnet sich automatisch."
echo "Drücke Ctrl+C um den Helper zu beenden."
echo ""

# Kill any existing helper processes
pkill -f "node helper/server.js" 2>/dev/null || true

# Start the helper
node helper/server.js
