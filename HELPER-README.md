# 🚀 Development Helper

**English** | [Deutsch](./HELPER-README.de.md)

A user-friendly helper tool for editing website content with Git integration, automatic dev server, and simplified workflow.

---

## 📑 Table of Contents

- [📋 What is the Development Helper?](#-what-is-the-development-helper)
- [🎯 Quick Start](#-quick-start)
- [📦 Prerequisites](#-prerequisites)
- [🔧 Installing Dependencies](#-installing-dependencies)
- [🎨 How the Helper Works](#-how-the-helper-works)
- [📚 Storybook](#-storybook)
- [🔍 Troubleshooting](#-troubleshooting)
- [🛠️ Advanced Usage](#️-advanced-usage)
- [📂 Project Structure](#-project-structure)
- [🌐 Technical Details](#-technical-details)
- [💡 Tips](#-tips)
- [🆘 Support](#-support)
- [📄 License](#-license)

---

## 📋 What is the Development Helper?

The Development Helper is an interactive tool that helps you:

- **Create and switch branches** easily
- **Start the dev server** automatically
- **Track and save changes**
- **Publish content** with one click
- **Avoid merge conflicts**

All through a clear web interface – **no terminal commands needed**!

---

## 🎯 Quick Start

### Windows

1. **Double-click** `Starte-Hilfsprogramm-Windows.cmd`
2. Browser opens automatically
3. Done! 🎉

### Mac

1. **Double-click** `Starte-Hilfsprogramm-Mac.command`
2. First time: Right-click → "Open" (security prompt)
3. Browser opens automatically
4. Done! 🎉

### Linux

1. Open terminal in project folder
2. Run: `./Starte-Hilfsprogramm-Linux.sh`
3. Browser opens automatically
4. Done! 🎉

---

## 📦 Prerequisites

The Development Helper requires the following software:

### ✅ **Node.js** (required)
- **Version:** 16 or higher recommended
- **Download:** [nodejs.org](https://nodejs.org/)
- **Includes:** Node.js and npm (package manager)

### ✅ **Git** (recommended)
- **Download:** [git-scm.com](https://git-scm.com/)
- **Note:** Required for branch management and publishing

### ℹ️ Automatic Check

The start scripts automatically check if all required programs are installed and show helpful installation instructions.

---

## 🔧 Installing Dependencies

### Windows

#### Install Node.js:
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (Recommended)
3. Run the installer
4. Restart your computer (optional, but recommended)

#### Install Git:
1. Visit [git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the installer
3. Run the installer (default settings are OK)

#### Verify everything works:
```cmd
node --version
npm --version
git --version
```

---

### Mac

#### Install Node.js:
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS version**
3. Run the installer

**Alternative with Homebrew:**
```bash
brew install node
```

#### Install Git:
Git is often pre-installed. Check with:
```bash
git --version
```

If not installed:
```bash
xcode-select --install
```

Or with Homebrew:
```bash
brew install git
```

#### Make file executable:
```bash
chmod +x Starte-Hilfsprogramm-Mac.command
```

---

### Linux

#### Install Node.js and npm:

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

#### Install Git:

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

#### Make file executable:
```bash
chmod +x Starte-Hilfsprogramm-Linux.sh
```

---

## 🎨 How the Helper Works

### 1️⃣ **Select Branch**
- Create a new branch for your changes
- Or select an existing branch
- View Git history visually

### 2️⃣ **Check Dependencies**
- The helper checks if npm packages are installed
- If needed: Install with one click

### 3️⃣ **Work & Edit**
- Dev server starts automatically
- Open browser at `http://localhost:5173`
- Edit content in `src/content` folder
- See changes live in browser

### 4️⃣ **Save & Publish**
- See all changed files at a glance
- Enter a commit message (automatically suggested)
- **Save only:** Save changes in branch
- **Save & publish:** Automatically merge into **PRODUCTION** branch

---

## 📚 Storybook

- Start: In "Development" page → "Storybook" section → "Start Storybook"
- Open: "Open in Browser" (http://localhost:6006)
- Build: "Build Storybook" creates a static build in `storybook-static/` folder

Required: Dependencies installed (`npm ci`) – already possible via "Dependencies" page.

---

## 🔍 Troubleshooting

### "Node.js is not installed"
→ Install Node.js from [nodejs.org](https://nodejs.org/)

### "npm is not installed"
→ npm is installed with Node.js. Reinstall Node.js.

### "Git is not installed"
→ Install Git from [git-scm.com](https://git-scm.com/)

### "Permission denied" (Mac/Linux)
→ Make the file executable:
```bash
chmod +x Starte-Hilfsprogramm-*.sh
chmod +x Starte-Hilfsprogramm-*.command
```

### "Dev server won't start"
→ Check if port 5173 is already in use:
```bash
# Mac/Linux
lsof -i :5173

# Windows
netstat -ano | findstr :5173
```

### Browser doesn't open automatically
→ Open manually: `http://localhost:8080`

---

## 🛠️ Advanced Usage

### Run Helper in Background

If you want to keep the helper running in the background:

**Windows:** Simply minimize the CMD window

**Mac/Linux:**
```bash
# Start in background with nohup
nohup ./Starte-Hilfsprogramm-Linux.sh &
```

### Stop Helper

**Windows:** Close the CMD window or press `Ctrl+C`

**Mac/Linux:** Press `Ctrl+C` in terminal

---

## 📂 Project Structure

```
calliope-docs/
├── helper/                    # Helper backend
│   ├── server.js              # HTTP server
│   ├── api.js                 # API endpoints
│   ├── utils.js               # Utility functions
│   └── index.html             # Web interface
├── src/
│   └── content/               # Editable content
├── Starte-Hilfsprogramm-Windows.cmd
├── Starte-Hilfsprogramm-Mac.command
└── Starte-Hilfsprogramm-Linux.sh
```

---

## 🌐 Technical Details

- **Server:** Node.js HTTP server on port 8080
- **Dev Server:** Vite on port 5173
- **Git Integration:** Branch management, commits, merge
- **UI:** Vanilla JavaScript, modern CSS (shadcn-inspired)

---

## 💡 Tips

1. **Branch Names:** Use descriptive names like `update-2025-10-24`
2. **Commit Messages:** Be specific: "Update product page MotionKit1"
3. **Save Regularly:** Secure your work through regular commits
4. **Only publish when ready:** Use "Save only" for intermediate stages

---

## 🆘 Support

If you have problems or questions:

1. Check the [Troubleshooting](#-troubleshooting) section above
2. Make sure all prerequisites are met
3. Contact the developer team

---

## 📄 License

Internal tool for the Calliope documentation project.

---

**Happy editing! 🚀**
