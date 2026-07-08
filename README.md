<div align="center">

# 📚 SNM Docs — Smart Network Mapper Documentation Site

### _Interactive Documentation & Download Portal_

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Three.js-Globe-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js"/>
  <img src="https://img.shields.io/badge/Deploy-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white" alt="Deploy"/>
  <img src="https://img.shields.io/badge/Pipeline-Phase_4_📚-blue?style=for-the-badge" alt="Phase 4"/>
</p>

<br/>

**The official documentation website for [Smart Network Mapper](https://github.com/Amine-NAHLI/smart-network-mapper), featuring a 3D interactive globe, animated backgrounds, multi-language support, and a one-click download portal.**

<br/>

🌐 **Live Site:** [https://amine-nahli.github.io/snm-docs/](https://amine-nahli.github.io/snm-docs/)

</div>

---

## 🔗 Project Ecosystem

This repository is **Phase 4** of the [Smart Network Mapper](https://github.com/Amine-NAHLI/smart-network-mapper) ecosystem — providing the documentation and distribution portal:

```
 ┌──────────────────────┐     ┌──────────────────────────┐     ┌──────────────────────────┐     ┌─────────────────────┐
 │  📊 CVE Dataset      │     │  🧠 Training Random      │     │  🛰️ Smart Network        │     │  📚 SNM Docs        │
 │     Generator        │ ──▶ │     Forest               │ ──▶ │     Mapper               │ ◀── │     (Website)       │
 │                      │     │                          │     │                          │     │ ★ YOU ARE HERE ★    │
 │  NVD API → CSV       │     │  Normalize → Train → PKL │     │  Scan + ML + Reports     │     │  Docs + Download    │
 └──────────────────────┘     └──────────────────────────┘     └──────────────────────────┘     └─────────────────────┘
        Phase 1                       Phase 2                         Phase 3                        Phase 4
```

| # | Repository | Role | Link |
|---|---|---|---|
| 1️⃣ | **CVE Dataset Generator** | NVD data collection & dataset generation | [![Repo](https://img.shields.io/badge/GitHub-cve--dataset--generator-blue?logo=github)](https://github.com/Amine-NAHLI/cve-dataset-generator) |
| 2️⃣ | **Training Random Forest** | ML model training pipeline | [![Repo](https://img.shields.io/badge/GitHub-training__random__forest-blue?logo=github)](https://github.com/Amine-NAHLI/training_random_forest) |
| 3️⃣ | **Smart Network Mapper** | Main application (scanner, AI, reports, GUI, CLI) | [![Repo](https://img.shields.io/badge/GitHub-smart--network--mapper-blue?logo=github)](https://github.com/Amine-NAHLI/smart-network-mapper) |
| 4️⃣ | **SNM Docs** _(this repo)_ | Documentation website & download portal | [![Repo](https://img.shields.io/badge/GitHub-snm--docs-blue?logo=github)](https://github.com/Amine-NAHLI/snm-docs) |

---

## ✨ Site Features

| Feature | Description |
|---|---|
| 🌍 **3D Interactive Globe** | React Three Fiber / Drei globe with animated network nodes |
| 🎨 **Cyberpunk Design** | Custom CSS design system with animated canvas backgrounds |
| 🌐 **Multi-Language** | Full English / French translations |
| 📥 **Download Portal** | One-click download of the Windows portable executable from Hugging Face |
| 📖 **Full Documentation** | Installation guide, usage, AI engine details, CVE dataset pipeline |
| 🎬 **Framer Motion** | Smooth scroll-triggered animations on all sections |
| 📱 **Responsive** | Fully responsive design for all screen sizes |
| 🐳 **Docker Ready** | Multi-stage Dockerfile (Node build → Nginx Alpine serve) |

### Documentation Sections

The site documents the entire SNM ecosystem:

| Section | Covers |
|---|---|
| **Overview** | Project presentation and capabilities |
| **Features** | Feature cards with all scanner, AI, and automation capabilities |
| **Installation** | Multi-tab guide (source setup, portable EXE, dependencies) |
| **Usage** | GUI workflow, CLI commands, scan modes |
| **AI Engine** | Random Forest pipeline, Wisdom Layer, NVD hybrid approach |
| **CVE Dataset** | Links to [`cve-dataset-generator`](https://github.com/Amine-NAHLI/cve-dataset-generator) with pipeline explanation |
| **Author** | Profile and contact links |

---

## 🏗️ Project Structure

```
snm-docs/
│
├── 📄 index.html                      # HTML entry point
├── 📄 vite.config.js                  # Vite config (base: /snm-docs/)
├── 📄 package.json                    # Dependencies & scripts
├── 📄 eslint.config.js                # ESLint configuration
├── 📄 Dockerfile                      # Docker containerization (Node → Nginx)
│
├── 📁 src/                            # 🔧 Source Code
│   ├── main.jsx                       # ├─ React entry point
│   ├── App.jsx                        # ├─ Root component (language context)
│   ├── App.css                        # ├─ App-level styles
│   ├── index.css                      # ├─ Global design system (CSS variables, 13KB)
│   │
│   ├── 📁 components/                 # ├─ 🧩 UI Components
│   │   ├── Hero.jsx                   # │   ├─ Hero section with animated title
│   │   ├── Navbar.jsx                 # │   ├─ Fixed top navigation bar
│   │   ├── Features.jsx               # │   ├─ Feature cards grid
│   │   ├── Overview.jsx               # │   ├─ Project overview section
│   │   ├── Installation.jsx           # │   ├─ Multi-tab install guide + download button
│   │   ├── Usage.jsx                  # │   ├─ Usage guide with code blocks
│   │   ├── AIEngine.jsx               # │   ├─ AI engine technical details
│   │   ├── CVEDataset.jsx             # │   ├─ CVE dataset documentation (links to Phase 1)
│   │   ├── Documentation.jsx          # │   ├─ Documentation hub wrapper
│   │   ├── Author.jsx                 # │   ├─ Author profile section
│   │   ├── Footer.jsx                 # │   ├─ Footer with links
│   │   ├── GlobeCanvas.jsx            # │   ├─ 3D globe (React Three Fiber / Drei)
│   │   ├── BackgroundCanvas.jsx       # │   ├─ Animated cyberpunk background (Canvas 2D)
│   │   └── GlobalBackground.jsx       # │   └─ Global background wrapper
│   │
│   ├── 📁 config/                     # ├─ ⚙️ Configuration
│   │   └── downloads.js               # │   └─ Download URLs (Hugging Face links)
│   │
│   ├── 📁 translations/               # ├─ 🌐 Internationalization
│   │   └── index.js                   # │   └─ EN/FR translation strings
│   │
│   ├── 📁 context/                    # ├─ 🔄 React Context
│   │   └── LanguageContext.jsx        # │   └─ Language state provider
│   │
│   └── 📁 hooks/                      # └─ 🪝 Custom Hooks
│       └── useScrollAnimation.js      #     └─ Intersection Observer hook
│
├── 📁 design-system/                  # 🎨 Design System Reference
│   └── demo.html                      # └─ Standalone design system demo
│
├── 📁 public/                         # 📁 Static Assets
│   └── (favicon, images, etc.)
│
└── 📁 dist/                           # 📦 Production Build Output
    └── (auto-generated by `npm run build`)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 9+

### Development

```bash
# Clone the repository
git clone https://github.com/Amine-NAHLI/snm-docs.git
cd snm-docs

# Install dependencies
npm install

# Start dev server with HMR
npm run dev
```

The site will be available at `http://localhost:5173/snm-docs/`.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This uses `gh-pages` to push the `dist/` folder to the `gh-pages` branch.

---

## ⚙️ Configuration

### Download URLs

The Windows portable download link is configured in `src/config/downloads.js`:

```js
export const WINDOWS_DOWNLOAD = {
  fileName: 'SNM_Windows_Portable_Complet.zip',
  size: '~5.5 GB',
  url: 'https://huggingface.co/aminenahli/snm-windows-portable/resolve/main/SNM_Windows_Portable_Complet.zip',
}
```

> 📦 This ZIP is built from the [`smart-network-mapper`](https://github.com/Amine-NAHLI/smart-network-mapper) repository using `build_tools/package_release.bat` and uploaded to Hugging Face via `build_tools/upload_windows_release.py`.

### Base Path

The Vite base path is set to `/snm-docs/` in `vite.config.js` for GitHub Pages compatibility.

---

## 🐳 Docker

```bash
# Build the image
docker build -t snm-docs .

# Run the container
docker run -p 8080:80 snm-docs
```

The Dockerfile uses a multi-stage build:
1. **Stage 1** (Node): `npm install` + `npm run build`
2. **Stage 2** (Nginx Alpine): serve the static `dist/` folder

---

## 📦 Tech Stack

| Technology | Role |
|---|---|
| ⚛️ **React 19** | UI framework |
| ⚡ **Vite 8** | Build tool & dev server |
| 🎨 **Tailwind CSS 4** | Utility-first styling |
| 🌍 **React Three Fiber** | 3D globe visualization |
| 🎬 **Framer Motion** | Scroll animations |
| 🔷 **Lucide React** | Icon library |
| 📄 **gh-pages** | GitHub Pages deployment |

---

<div align="center">

**Made with ❤️ by [Amine Nahli](https://github.com/Amine-NAHLI)**

### 🔗 Related Repositories

[![CVE Dataset Generator](https://img.shields.io/badge/📊_CVE_Dataset_Generator-Phase_1-orange?style=for-the-badge)](https://github.com/Amine-NAHLI/cve-dataset-generator)
[![Training Random Forest](https://img.shields.io/badge/🧠_Training_Random_Forest-Phase_2-purple?style=for-the-badge)](https://github.com/Amine-NAHLI/training_random_forest)
[![Smart Network Mapper](https://img.shields.io/badge/🛰️_Smart_Network_Mapper-Main_App-green?style=for-the-badge)](https://github.com/Amine-NAHLI/smart-network-mapper)

_July 2026 — SNM Documentation Site_

</div>
