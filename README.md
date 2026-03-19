<div align="center">

# 🏛️ JanaSewa — जनसेवा

### *तपाईंको आवाज, तपाईंको शहर*
### *Your Voice, Your City*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**A mobile-first, bilingual public grievance reporting platform empowering the citizens of Kathmandu to report, track, and upvote local infrastructure issues — making civic engagement transparent and accessible.**

---

[Features](#-features) · [Tech Stack](#-tech-stack) · [Quick Start](#-quick-start) · [Screenshots](#-screenshots) · [Architecture](#-architecture) · [Contributing](#-contributing)

</div>

---

## 🎯 The Problem

Kathmandu's 32 wards face daily infrastructure challenges — potholes, water shortages, garbage pile-ups, drainage blockages, and power outages. Citizens lack a unified, transparent platform to report these issues and track their resolution. Traditional complaint channels are slow, opaque, and inaccessible to many.

## 💡 The Solution

**JanaSewa** bridges the gap between citizens and local government by providing a mobile-friendly, bilingual (English/नेपाली) platform where anyone can:

- 📸 **Report** issues with photos and GPS location
- 🗺️ **Visualize** problems on an interactive map
- 📊 **Track** progress from Pending → In Progress → Resolved
- 👍 **Upvote** issues to prioritize what matters most
- 🌐 **Use in Nepali or English** with one-tap language switching

---

## ✨ Features

### 🔐 Authentication
- Phone-based login with Nepal country code (+977)
- OTP verification flow (demo-ready with any 4-digit code)
- Persistent user sessions

### 📊 Public Dashboard
- Real-time statistics — total reports, resolution rate, active issues
- Interactive grievance feed with rich info cards
- Multi-layer filtering by **status**, **category**, and **ward**
- Sort by newest or most upvoted

### 📝 Report Issues
- **6 categories**: Road Damage, Water Supply, Electricity, Garbage, Drainage, Other
- Title + detailed description with validation
- Photo upload with camera capture support (mobile)
- Interactive map-based location picker with GPS auto-detect
- Ward selection (all 32 Kathmandu wards)

### 🗺️ Interactive Map
- Full-screen Leaflet map centered on Kathmandu
- Color-coded custom markers by status (amber/blue/green)
- Clickable popups with issue details and navigation
- Status filter chips and legend overlay

### 📋 Grievance Detail
- Status stepper timeline (Pending → In Progress → Resolved)
- Embedded location map
- Community upvote system (one vote per user, with pulse animation)
- Native share support via Web Share API

### 🌐 Bilingual (i18n)
- Complete English and Nepali translations (79+ keys)
- One-tap toggle between languages
- Language preference remembered across sessions

### 👤 User Profile
- View all your submitted reports with status tracking
- Quick navigation to report details
- Easy logout

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 | Component-based UI with hooks |
| **Build** | Vite 8 | Lightning-fast dev server & HMR |
| **Language** | JavaScript (ES Modules) | Application logic |
| **Styling** | Vanilla CSS | Custom dark theme design system |
| **Maps** | Leaflet + React-Leaflet | Interactive mapping |
| **Tiles** | OpenStreetMap | Free, open map tiles |
| **Icons** | Lucide React | Beautiful SVG icon set |
| **i18n** | Custom React Context | Lightweight bilingual support |
| **Storage** | localStorage | Client-side data persistence |
| **Linting** | ESLint 9 | Code quality enforcement |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Aayush498/JanaSewa.git

# Navigate to the project
cd JanaSewa

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **http://localhost:5173** 🎉

### Other Scripts

```bash
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint checks
```

---

## 📸 Screenshots

### Login Screen
> Phone-based authentication with OTP flow, featuring a premium dark UI with animated logo ring and the JanaSewa branding.

### Dashboard
> Statistics overview with grievance cards, status tabs (All/Pending/In Progress/Resolved), category & ward filters, and sort controls.

### Report Form
> Six category selection grid, photo upload with camera capture, interactive Leaflet map for location pinning, and ward dropdown for all 32 Kathmandu wards.

### Map View
> Full-screen interactive map with color-coded markers (amber=Pending, blue=In Progress, green=Resolved), popup cards, filter chips, and a status legend.

### Detail View
> Complete grievance info with status stepper timeline, embedded map, community upvote button with pulse animation, and share functionality.

---

## 🏗️ Architecture

```
JanaSewa/
├── index.html                    # Entry point with SEO meta tags
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite + React plugin config
├── FEATURES.txt                  # Detailed feature documentation
│
└── src/
    ├── main.jsx                  # React DOM entry
    ├── App.jsx                   # Root component & page routing
    ├── index.css                 # Complete design system
    │
    ├── components/               # Reusable UI components
    │   ├── Header.jsx            # App header + language toggle
    │   ├── BottomNav.jsx         # Bottom tab navigation
    │   ├── GrievanceCard.jsx     # Issue card for feed
    │   ├── StatusBadge.jsx       # Colored status indicator
    │   └── CategoryIcon.jsx      # Category-specific icons
    │
    ├── pages/                    # Full-page views
    │   ├── LoginPage.jsx         # Authentication flow
    │   ├── DashboardPage.jsx     # Main feed + stats
    │   ├── ReportPage.jsx        # Issue submission form
    │   ├── DetailPage.jsx        # Single issue view
    │   ├── MapPage.jsx           # Full-screen map
    │   └── ProfilePage.jsx       # User profile
    │
    ├── data/
    │   └── store.js              # Data store, CRUD, seed data
    │
    └── i18n/
        ├── LanguageContext.jsx    # Translation React Context
        ├── en.json               # English (79 keys)
        └── ne.json               # Nepali (79 keys)
```

### Design Decisions

- **No external state library** — React's `useState` + `useCallback` + `useMemo` are sufficient for this MVP scope, keeping the bundle tiny.
- **localStorage as data store** — Enables full offline functionality and eliminates backend dependency during prototyping.
- **Custom i18n over libraries** — A 36-line Context Provider is lighter than i18next (~50KB) for two-language support.
- **Vanilla CSS over utility frameworks** — Full creative control over the dark glassmorphism theme without framework overhead.
- **Leaflet over Google Maps** — Free, open-source, no API key required, and excellent React integration.

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0e1a` | App background |
| Card Surface | `rgba(255,255,255,0.05)` | Glassmorphic cards |
| Pending | `#f59e0b` | Amber — awaiting action |
| In Progress | `#3b82f6` | Blue — being addressed |
| Resolved | `#10b981` | Green — issue fixed |
| Road Damage | `#ef4444` | Red category icon |
| Water Supply | `#3b82f6` | Blue category icon |
| Electricity | `#f59e0b` | Amber category icon |
| Garbage | `#10b981` | Green category icon |
| Drainage | `#8b5cf6` | Purple category icon |

### Issue Categories

| Category | Icon | Description |
|----------|------|-------------|
| 🚧 Road Damage | Construction | Potholes, cracks, road collapse |
| 💧 Water Supply | Droplets | Pipe bursts, no supply, contamination |
| ⚡ Electricity | Zap | Outages, broken streetlights |
| 🗑️ Garbage | Trash2 | Pile-ups, illegal dumping |
| 🌊 Drainage | Waves | Blocked drains, sewage overflow |
| ❓ Other | HelpCircle | Miscellaneous civic issues |

---

## 🗺️ Coverage

Currently focused on **Kathmandu Metropolitan City** with support for all **32 wards**. The app comes pre-loaded with 10 realistic sample grievances from locations across Kathmandu including Kalanki, Baluwatar, Lazimpat, Teku, Baneshwor, Patan, Maharajgunj, Koteshwor, Thapathali, and Jawalakhel.

---

## 🔮 Roadmap

- [ ] Backend API (Node.js/Express or Firebase)
- [ ] Real SMS-based OTP verification
- [ ] Admin dashboard for government officials
- [ ] Push notifications for status updates
- [ ] Image compression & cloud storage (Cloudinary/S3)
- [ ] Full PWA with offline-first Service Worker
- [ ] Ward-level analytics & heatmaps
- [ ] Government department auto-routing
- [ ] Comment/reply system
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Multi-municipality expansion beyond Kathmandu

---

## 🤝 Contributing

Contributions are welcome! If you'd like to help improve JanaSewa:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ for the people of Kathmandu**

*JanaSewa — Because every pothole matters.*

🏛️ जनसेवा 🇳🇵

</div>
