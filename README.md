# Ny Fitia — Site Freelance & Portfolio

Site web professionnel combinant vente de services freelance et portfolio.

## Stack technique

- **React 19** + **Vite 8** — Framework & bundler
- **Tailwind CSS v4** — Styles utilitaires, dark mode, responsive
- **React Router DOM** — Navigation multi-pages
- **react-i18next** — Internationalisation FR/EN
- **Framer Motion** — Animations
- **Lucide React** — Icones
- **React Hook Form** — Formulaire de contact

## Pages

| Route | Page |
|---|---|
| `/` | Landing page (Hero + CTA) |
| `/services` | Services freelance (4 offres) |
| `/portfolio` | Portfolio (3 projets) |
| `/contact` | Formulaire de contact |

## Installation

```bash
npm install
```

## Developpement

```bash
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## Structure du projet

```
src/
├── main.jsx              # Point d'entree + Router
├── App.jsx               # Layout global (Navbar + Outlet + Footer)
├── index.css             # Tailwind + styles globaux
├── pages/                # Pages du site
├── components/
│   ├── layout/           # Navbar, Footer
│   └── ui/               # Composants reutilisables
├── context/              # ThemeContext (dark/light)
├── hooks/                # useTheme
├── i18n/                 # Config + traductions FR/EN
├── data/                 # Donnees services et projets
└── assets/               # Fonts, images
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Composants](docs/COMPONENTS.md)
- [Internationalisation](docs/I18N.md)
- [Theming](docs/THEMING.md)
