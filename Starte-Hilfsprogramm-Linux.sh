#!/bin/bash
# ========================================
# Development Helper für Linux
# ========================================
# Führe diese Datei aus, um den
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

# Check if Node.js is installed
if ! command_exists node; then
    echo "[FEHLER] Node.js ist nicht installiert!"
    echo ""
    echo "Der Development Helper benötigt Node.js."
    echo ""
    echo "INSTALLATION:"
    echo ""
    echo "Ubuntu/Debian:"
    echo "  sudo apt update"
    echo "  sudo apt install nodejs npm"
    echo ""
    echo "Fedora:"
    echo "  sudo dnf install nodejs npm"
    echo ""
    echo "Arch Linux:"
    echo "  sudo pacman -S nodejs npm"
    echo ""
    echo "Oder besuche: https://nodejs.org/"
    echo ""
    
    # Ask if user wants to try installing Node.js
    read -p "Möchtest du versuchen, Node.js automatisch zu installieren? (j/n): " -r INSTALL
    if [[ "$INSTALL" =~ ^[jJ]$ ]]; then
        if command_exists apt; then
            echo "Installiere Node.js mit apt..."
            sudo apt update && sudo apt install -y nodejs npm
        elif command_exists dnf; then
            echo "Installiere Node.js mit dnf..."
            sudo dnf install -y nodejs npm
        elif command_exists pacman; then
            echo "Installiere Node.js mit pacman..."
            sudo pacman -S --noconfirm nodejs npm
        elif command_exists yum; then
            echo "Installiere Node.js mit yum..."
            sudo yum install -y nodejs npm
        else
            echo "Konnte keinen Paketmanager finden."
            echo "Bitte installiere Node.js manuell von: https://nodejs.org/"
            exit 1
        fi
        
        # Check if installation was successful
        if command_exists node; then
            echo ""
            echo "[OK] Node.js wurde erfolgreich installiert!"
            NODE_VERSION=$(node --version)
            echo "    Version: $NODE_VERSION"
        else
            echo ""
            echo "[FEHLER] Installation fehlgeschlagen."
            echo "Bitte installiere Node.js manuell von: https://nodejs.org/"
            exit 1
        fi
    else
        exit 1
    fi
else
    echo "[OK] Node.js ist installiert"
    NODE_VERSION=$(node --version)
    echo "    Version: $NODE_VERSION"
fi

echo ""

# Check if npm is available
if ! command_exists npm; then
    echo "[FEHLER] npm ist nicht installiert!"
    echo "npm sollte normalerweise mit Node.js installiert werden."
    echo ""
    
    # Try to install npm
    read -p "Möchtest du versuchen, npm zu installieren? (j/n): " -r INSTALL_NPM
    if [[ "$INSTALL_NPM" =~ ^[jJ]$ ]]; then
        if command_exists apt; then
            sudo apt install -y npm
        elif command_exists dnf; then
            sudo dnf install -y npm
        elif command_exists pacman; then
            sudo pacman -S --noconfirm npm
        elif command_exists yum; then
            sudo yum install -y npm
        fi
    fi
    
    if ! command_exists npm; then
        echo "npm konnte nicht installiert werden."
        exit 1
    fi
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
    echo "  Ubuntu/Debian: sudo apt install git"
    echo "  Fedora:        sudo dnf install git"
    echo "  Arch Linux:    sudo pacman -S git"
    echo ""
    
    read -p "Möchtest du Git jetzt installieren? (j/n): " -r INSTALL_GIT
    if [[ "$INSTALL_GIT" =~ ^[jJ]$ ]]; then
        if command_exists apt; then
            sudo apt install -y git
        elif command_exists dnf; then
            sudo dnf install -y git
        elif command_exists pacman; then
            sudo pacman -S --noconfirm git
        elif command_exists yum; then
            sudo yum install -y git
        fi
    fi
    
    if ! command_exists git; then
        read -p "Möchtest du trotzdem fortfahren? (j/n): " -r CONTINUE
        if [[ ! "$CONTINUE" =~ ^[jJ]$ ]]; then
            exit 1
        fi
    else
        echo ""
        echo "[OK] Git wurde installiert"
        GIT_VERSION=$(git --version)
        echo "    $GIT_VERSION"
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
