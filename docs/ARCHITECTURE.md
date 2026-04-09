# Architecture

## Vue d'ensemble

Site multi-pages React avec layout partage. Chaque page est une route distincte, le layout (Navbar + Footer) est commun.

## Arbre des composants

```
BrowserRouter
└── Routes
    └── Route "/" → App (layout)
        ├── Navbar
        │   ├── Logo (Link)
        │   ├── NavLinks (Home, Services, Portfolio, Contact)
        │   ├── LanguageToggle (FR/EN)
        │   └── ThemeToggle (clair/sombre)
        │
        ├── Outlet (contenu de la page active)
        │   ├── "/" → Home (Hero + CTA)
        │   ├── "/services" → Services (grille ServiceCard x4)
        │   ├── "/portfolio" → Portfolio (grille ProjectCard x3)
        │   └── "/contact" → Contact (formulaire)
        │
        └── Footer
```

## Flux de donnees

### Theme (dark/light)
- `ThemeContext` gere le state global du theme
- Stocke dans `localStorage` pour persister entre les sessions
- Detecte `prefers-color-scheme` au premier chargement
- Ajoute/retire la classe `dark` sur `<html>` pour Tailwind

### Langue (FR/EN)
- `i18next` gere la langue active globalement
- Detection automatique : localStorage > navigator.language
- Fichiers de traduction : `src/i18n/fr.json` et `src/i18n/en.json`
- Les composants utilisent `useTranslation()` pour acceder aux traductions

### Donnees statiques
- `src/data/services.js` : liste des 4 services (id, icone, cle i18n)
- `src/data/projects.js` : liste des 3 projets (id, image, tech, cle i18n)
- Les textes sont des cles i18n, pas du texte en dur

## Choix techniques

| Decision | Choix | Raison |
|---|---|---|
| Routing | react-router-dom | Standard pour multi-pages React |
| State global | React Context | Un seul state global (theme), pas besoin de Redux |
| CSS | Tailwind v4 | Dark mode natif, responsive natif, plugin Vite |
| i18n | react-i18next | Standard, fichiers JSON simples |
| Animations | framer-motion | API declarative, legere |
