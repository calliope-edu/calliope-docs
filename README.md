# Calliope Documentation

**English** | [Deutsch](./README.de.md)

**📖 Documentation (English):** [Developer Guide](./DEVELOPER-README.md) · [Helper Tool Guide](./HELPER-README.md)  
**📖 Dokumentation (Deutsch):** [Entwickler-Handbuch](./DEVELOPER-README.de.md) · [Hilfsprogramm-Anleitung](./HELPER-README.de.md)

---

> 📚 A file-based CMS approach using SvelteKit and Markdown, separating content from code while keeping full developer flexibility.

[![Built with SvelteKit](https://img.shields.io/badge/Built%20with-SvelteKit-FF3E00?style=flat&logo=svelte)](https://kit.svelte.dev/)
[![MDsveX](https://img.shields.io/badge/Powered%20by-MDsveX-FF3E00?style=flat)](https://mdsvex.pngwn.io/)

---

## 📑 Table of Contents

- [🎯 What is this?](#-what-is-this)
- [✨ Key Features](#-key-features)
- [🏗️ How It Works](#️-how-it-works)
- [🚀 Quick Start](#-quick-start)
- [📖 Documentation](#-documentation)
- [🛠️ Available Scripts](#️-available-scripts)
- [📁 Project Structure](#-project-structure)
- [🌍 Multi-language Support](#-multi-language-support)
- [🎨 Using Components in Markdown](#-using-components-in-markdown)
- [🖼️ Image Handling](#️-image-handling)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🎯 What is this?

This is the technical documentation site for [Calliope mini](https://calliope.cc/) - an educational microcontroller board. The architecture treats Markdown files as a file-based CMS where:

- **Content editors** work only with Markdown files - no `+page.svelte` files, no imports, no `<script>` or `<style>` sections
- **Developers** maintain full SvelteKit functionality and can use everything as usual
- **Both roles** have clear boundaries without limiting each other

> **Note**: This architecture is shared with and maintained for [Moliri](https://moliri.app).

## ✨ Key Features

### For Content Editors
- 📝 Write in Markdown without `<script>`, `<style>` or import statements
- 🖼️ Co-locate images, videos, and assets with content files
- 🌍 Multi-language support (German/English)
- 🎨 Use Svelte components directly in Markdown (auto-imported)
- 🔄 Simple Git-based workflow via helper tool
- ⚡ **Automatic image optimization** - Images are automatically converted to modern formats (WebP/AVIF), resized, and optimized at build time without any manual work

### For Developers
- 🚀 Full SvelteKit functionality remains available
- 🔌 Automatic component injection keeps Markdown clean
- 🖼️ Image processing with wildcards and EXIF metadata
- 📦 Pre-build system handles sitemap and asset management
- 🎭 Multi-layer template system via frontmatter
- 🌐 Paraglide i18n integration
- ⚡ Static site generation with prerendering

## 🏗️ How It Works

The system uses several mechanisms to achieve the separation:

### Custom MDsveX Plugins
- **Relative Images** - Transform `./image.jpg|w=800` to optimized Vite imports with wildcard support
- **Auto-import Components** - Use Svelte components in Markdown without manual imports
- **Frontmatter Imports** - Process frontmatter image references automatically
- **Template Loader** - Dynamic template injection via frontmatter

### Pre-build System
- **Asset Packing** - Copies content assets to static folder with path transformations
- **Sitemap Generation** - Builds navigation structure from content file hierarchy
- **Multi-language Support** - Language-specific file resolution with intelligent fallbacks

### Smart Routing
- **Catch-all Routes** - Dynamic content loading based on file structure
- **Language Resolution** - URL-based and browser-based language detection
- **Glob Imports** - Efficient bundling with Vite's `import.meta.glob`

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/calliope-edu/calliope-docs.git
cd calliope-docs

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Development Helper (Optional)

For content editors, we provide a user-friendly helper tool:

**Windows:** Double-click `Starte-Hilfsprogramm-Windows.cmd`  
**Mac:** Double-click `Starte-Hilfsprogramm-Mac.command`  
**Linux:** Run `./Starte-Hilfsprogramm-Linux.sh`

This opens a web interface for branch management, content editing, and publishing.

## 📖 Documentation

- **[DEVELOPER-README.md](./DEVELOPER-README.md)** - Comprehensive technical architecture guide for developers
- **[DEVELOPER-README.de.md](./DEVELOPER-README.de.md)** - Umfassendes technisches Architektur-Handbuch (German)
- **[HELPER-README.en.md](./HELPER-README.md)** - Guide for the content editor helper tool
- **[HELPER-README.md](./HELPER-README.de.md)** - Anleitung für das Content-Editor-Hilfsprogramm (German)

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Build and generate sitemap
npm run pack         # Run asset packing script only
npm run storybook    # Start Storybook component explorer
```

## 📁 Project Structure

```
calliope-docs/
├── src/
│   ├── content/           # 📝 Markdown content + assets
│   │   ├── python/        # Python API documentation
│   │   ├── tech/          # Technical documentation
│   │   └── ...
│   ├── routes/            # 🛣️ SvelteKit routes
│   ├── lib/               # 🧩 Components, scripts, templates
│   └── scss/              # 🎨 Global styles
├── prebuild/              # 🔨 Pre-build scripts
├── mdsvexplugins/         # 🔌 Custom MDsveX plugins
├── helper/                # 🛠️ Development helper tool
└── static/                # 📦 Static assets (fonts, etc.)
```

## 🌍 Multi-language Support

Content files can be language-specific:

```
index.page       # Default (fallback, typically German)
index.de.page    # German version
index.en.page    # English version
```

URLs are automatically localized:
- `/python/module/` - Default language
- `/en/python/module/` - English version

## 🎨 Using Components in Markdown

Components are auto-imported, so you can use them directly:

```markdown
<Admonition type='tip'>
This is a tip!
</Admonition>

<Video src="./demo.mp4" />

<Steps>
<Step>First step</Step>
<Step>Second step</Step>
</Steps>
```

## 🖼️ Image Handling

### Basic Images
```markdown
![Alt text](./image.jpg)
```

### With Optimization
```markdown
![Alt text](./image.jpg|w=800|h=600)
```

### Image Galleries (Wildcards)
```markdown
![Gallery](./images/*.jpg|w=400)
```

## 🤝 Contributing

We welcome contributions! Whether you're fixing typos, adding content, or improving the architecture:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### For Content Editors
Use the helper tool (see Quick Start) or edit files in `/src/content/` directly.

### For Developers
Check out [DEVELOPER-README.md](./DEVELOPER-README.md) for architecture details.

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

- **Architecture & Development**: [@Amerlander](https://github.com/Amerlander) - Original CMS architecture developed for [Moliri](https://moliri.app)
- Built with [SvelteKit](https://kit.svelte.dev/)
- Markdown processing via [MDsveX](https://mdsvex.pngwn.io/)
- Internationalization via [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- Image optimization via [@sveltejs/enhanced-img](https://kit.svelte.dev/docs/images)

---

**Questions?** Open an issue or check the [developer documentation](./DEVELOPER-README.md).
