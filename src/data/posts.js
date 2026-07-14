export const posts = [
  {
    slug: 'lighthouse-score-90-comment-y-arriver',
    category: 'performance',
    tags: ['SEO', 'Performance', 'Lighthouse', 'Core Web Vitals'],
    date: '2025-11-12',
    readTime: 7,
    fr: {
      title: 'Score Lighthouse 90+ : comment y arriver concrètement',
      excerpt: 'Après avoir amélioré le score mobile du site Sakalava Lodge de 45 à 93, voici les optimisations qui ont vraiment compté — sans changer de framework.',
      content: `## Le contexte

En 2025, j'ai optimisé le site [Sakalava Lodge](https://sakalavalodge.com) : un site hôtelier avec des images lourdes, pas de lazy-loading, un LCP de plus de 6 secondes sur mobile. Score Lighthouse : 45/100.

Objectif : passer au-dessus de 90 sans refaire le site from scratch.

## Ce qui a vraiment fait la différence

### 1. Images : le levier n°1

La plupart des sites perdent 20 à 30 points uniquement à cause des images.

- Convertir en **WebP** (gain moyen : -60% du poids)
- Ajouter **\`loading="lazy"\`** sur toutes les images hors viewport
- Définir des **\`width\` et \`height\`** explicites pour éviter le CLS (Cumulative Layout Shift)
- Utiliser **\`fetchpriority="high"\`** sur l'image hero (LCP cible)

\`\`\`html
<img
  src="/hero.webp"
  width="1200"
  height="630"
  fetchpriority="high"
  alt="Vue de la plage Sakalava"
/>
\`\`\`

### 2. Supprimer les ressources bloquantes

Le CSS et JS qui bloquent le rendu initial (render-blocking) font exploser le FCP (First Contentful Paint).

- Déplacer les scripts non-critiques en **\`defer\`** ou **\`async\`**
- Inliner le CSS critique (above-the-fold) dans le \`<head>\`
- Précharger les fonts avec \`<link rel="preconnect">\`

### 3. Cache et compression

- Activer **gzip** ou **Brotli** côté serveur
- Configurer les headers \`Cache-Control\` pour les assets statiques (images, fonts, JS)
- Sur Vercel/Nginx : \`max-age=31536000, immutable\` pour les assets hashés

### 4. Éviter les re-renders inutiles (côté React)

Si tu utilises React, surveille les **re-renders excessifs** :
- Mémoïser les composants lourds avec \`React.memo\`
- Utiliser \`useMemo\` / \`useCallback\` sur les calculs coûteux
- Ne jamais créer de fonctions inline dans le JSX des listes

## Résultat

| Métrique | Avant | Après |
|---|---|---|
| Score mobile | 45 | 93 |
| LCP | 6.2s | 1.8s |
| CLS | 0.41 | 0.02 |
| FCP | 3.8s | 1.1s |

## Ce qui ne sert à rien (souvent surestimé)

- Changer de framework (le problème vient rarement du framework)
- Minifier le HTML (gain : quelques Ko)
- Supprimer les commentaires dans le code (aucun impact)

Le vrai levier : **les images** et **le rendering path**. Commencez par là.`,
    },
    en: {
      title: 'Lighthouse Score 90+: How to Actually Get There',
      excerpt: 'After improving the Sakalava Lodge mobile score from 45 to 93, here are the optimizations that actually mattered — without changing the framework.',
      content: `## Context

In 2025, I optimized [Sakalava Lodge](https://sakalavalodge.com): a hotel site with heavy images, no lazy-loading, an LCP over 6 seconds on mobile. Lighthouse score: 45/100.

Goal: exceed 90 without rebuilding the site from scratch.

## What actually made the difference

### 1. Images: the #1 lever

Most sites lose 20 to 30 points from images alone.

- Convert to **WebP** (average gain: -60% file size)
- Add **\`loading="lazy"\`** on all off-screen images
- Set explicit **\`width\` and \`height\`** to avoid CLS (Cumulative Layout Shift)
- Use **\`fetchpriority="high"\`** on the hero image (LCP target)

\`\`\`html
<img
  src="/hero.webp"
  width="1200"
  height="630"
  fetchpriority="high"
  alt="View of Sakalava beach"
/>
\`\`\`

### 2. Remove render-blocking resources

CSS and JS that block the initial render spike your FCP (First Contentful Paint).

- Move non-critical scripts to **\`defer\`** or **\`async\`**
- Inline critical (above-the-fold) CSS in the \`<head>\`
- Preload fonts with \`<link rel="preconnect">\`

### 3. Cache and compression

- Enable **gzip** or **Brotli** server-side
- Set \`Cache-Control\` headers for static assets (images, fonts, JS)
- On Vercel/Nginx: \`max-age=31536000, immutable\` for hashed assets

### 4. Avoid unnecessary re-renders (React-side)

If you use React, watch for **excessive re-renders**:
- Memoize heavy components with \`React.memo\`
- Use \`useMemo\` / \`useCallback\` on expensive computations
- Never create inline functions in list JSX

## Results

| Metric | Before | After |
|---|---|---|
| Mobile score | 45 | 93 |
| LCP | 6.2s | 1.8s |
| CLS | 0.41 | 0.02 |
| FCP | 3.8s | 1.1s |

## What doesn't help (often overrated)

- Switching frameworks (the problem rarely comes from the framework)
- Minifying HTML (gain: a few KB)
- Removing code comments (zero impact)

The real levers: **images** and **the rendering path**. Start there.`,
    },
  },
  {
    slug: 'core-web-vitals-guide-pratique',
    category: 'performance',
    tags: ['Core Web Vitals', 'SEO', 'UX', 'Google'],
    date: '2026-01-08',
    readTime: 6,
    fr: {
      title: 'Core Web Vitals : le guide pratique pour les développeurs',
      excerpt: 'LCP, CLS, INP — ces trois métriques Google impactent directement votre référencement. Voici comment les mesurer et les corriger sans être expert SEO.',
      content: `## Pourquoi les Core Web Vitals comptent vraiment

Depuis 2021, Google intègre les **Core Web Vitals** dans son algorithme de classement. Un mauvais score = moins de visibilité organique. Et surtout, un mauvais score = une mauvaise expérience utilisateur.

Trois métriques à surveiller :

| Métrique | Ce que ça mesure | Cible |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Vitesse de chargement visible | < 2.5s |
| **CLS** (Cumulative Layout Shift) | Stabilité visuelle | < 0.1 |
| **INP** (Interaction to Next Paint) | Réactivité aux clics | < 200ms |

## LCP : charger le contenu principal rapidement

Le LCP mesure le temps pour afficher **le plus grand élément visible** (souvent l'image hero ou le titre principal).

**Causes fréquentes d'un mauvais LCP :**
- Images non optimisées (trop lourdes, pas en WebP)
- Ressources CSS/JS bloquantes avant le rendu
- Absence de \`fetchpriority="high"\` sur l'image principale

**Solution rapide :**
\`\`\`html
<!-- Priorité haute sur l'image hero -->
<link rel="preload" as="image" href="/hero.webp" />
<img src="/hero.webp" fetchpriority="high" alt="..." />
\`\`\`

## CLS : éviter que la page "saute"

Le CLS mesure combien les éléments bougent **après** le chargement initial. Rien de plus frustrant qu'un bouton qui se déplace juste avant qu'on clique.

**Causes fréquentes :**
- Images sans dimensions définies
- Fonts qui se chargent après le contenu
- Publicités ou embeds qui s'insèrent dynamiquement

**Solution :**
\`\`\`css
/* Réserver l'espace avant que l'image charge */
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}
\`\`\`

\`\`\`html
<!-- Toujours définir width et height -->
<img src="photo.jpg" width="800" height="450" alt="..." />
\`\`\`

## INP : rendre l'interface réactive

L'INP (remplaçant du FID depuis 2024) mesure la réactivité à chaque interaction : clics, touches, saisie clavier.

**Causes fréquentes d'un mauvais INP :**
- JavaScript long à s'exécuter sur le main thread
- Event handlers lourds (trop de calculs synchrones)
- Animations CSS non optimisées (éviter \`top\`/\`left\`, préférer \`transform\`)

**Solution :**
\`\`\`javascript
// Mauvais : calcul synchrone bloquant
button.addEventListener('click', () => {
  // traitement lourd...
  updateUI()
})

// Bon : déférer le traitement lourd
button.addEventListener('click', () => {
  updateUI() // réponse visuelle immédiate
  setTimeout(() => heavyProcessing(), 0) // calcul différé
})
\`\`\`

## Mesurer avec les bons outils

- **Chrome DevTools** → onglet "Performance"
- **PageSpeed Insights** (données terrain réelles)
- **web.dev/measure** (audit complet)
- **Vercel Analytics** si hébergé sur Vercel

## L'ordre d'attaque recommandé

1. Identifier votre pire métrique sur PageSpeed Insights
2. Corriger les images en premier (impact LCP + CLS)
3. Supprimer les scripts bloquants
4. Tester sur mobile, pas seulement desktop

Les Core Web Vitals sont une opportunité : si vos concurrents les ignorent, vous gagnez des positions simplement en les corrigeant.`,
    },
    en: {
      title: 'Core Web Vitals: A Practical Guide for Developers',
      excerpt: 'LCP, CLS, INP — these three Google metrics directly impact your search ranking. Here\'s how to measure and fix them without being an SEO expert.',
      content: `## Why Core Web Vitals Actually Matter

Since 2021, Google has incorporated **Core Web Vitals** into its ranking algorithm. A bad score = less organic visibility. And more importantly, a bad score = a bad user experience.

Three metrics to watch:

| Metric | What it measures | Target |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Visible loading speed | < 2.5s |
| **CLS** (Cumulative Layout Shift) | Visual stability | < 0.1 |
| **INP** (Interaction to Next Paint) | Click responsiveness | < 200ms |

## LCP: Load the main content fast

LCP measures the time to display **the largest visible element** (usually the hero image or main title).

**Common causes of a bad LCP:**
- Unoptimized images (too heavy, not in WebP)
- Render-blocking CSS/JS resources
- Missing \`fetchpriority="high"\` on the main image

**Quick fix:**
\`\`\`html
<!-- High priority on the hero image -->
<link rel="preload" as="image" href="/hero.webp" />
<img src="/hero.webp" fetchpriority="high" alt="..." />
\`\`\`

## CLS: Stop the page from "jumping"

CLS measures how much elements shift **after** the initial load. Nothing is more frustrating than a button that moves right before you click it.

**Common causes:**
- Images without defined dimensions
- Fonts loading after content
- Ads or embeds inserted dynamically

**Fix:**
\`\`\`css
/* Reserve space before the image loads */
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}
\`\`\`

\`\`\`html
<!-- Always define width and height -->
<img src="photo.jpg" width="800" height="450" alt="..." />
\`\`\`

## INP: Make the interface responsive

INP (replacing FID since 2024) measures responsiveness to every interaction: clicks, taps, keyboard input.

**Common causes of bad INP:**
- Long JavaScript execution on the main thread
- Heavy event handlers (too many synchronous computations)
- Unoptimized CSS animations (avoid \`top\`/\`left\`, prefer \`transform\`)

**Fix:**
\`\`\`javascript
// Bad: synchronous blocking computation
button.addEventListener('click', () => {
  // heavy processing...
  updateUI()
})

// Good: defer heavy processing
button.addEventListener('click', () => {
  updateUI() // immediate visual response
  setTimeout(() => heavyProcessing(), 0) // deferred computation
})
\`\`\`

## Measure with the right tools

- **Chrome DevTools** → "Performance" tab
- **PageSpeed Insights** (real field data)
- **web.dev/measure** (full audit)
- **Vercel Analytics** if hosted on Vercel

## Recommended attack order

1. Identify your worst metric on PageSpeed Insights
2. Fix images first (LCP + CLS impact)
3. Remove blocking scripts
4. Test on mobile, not just desktop

Core Web Vitals are an opportunity: if your competitors ignore them, you gain positions simply by fixing yours.`,
    },
  },
  {
    slug: 'automatiser-avec-les-llm-premiers-pas',
    category: 'ia',
    tags: ['IA', 'LLM', 'Automatisation', 'API'],
    date: '2026-03-15',
    readTime: 8,
    fr: {
      title: 'Automatiser avec les LLM : premiers pas concrets',
      excerpt: 'Les LLM ne servent pas qu\'à faire des chatbots. Voici 5 cas d\'usage réels où un appel API à GPT-4 ou Gemini remplace des heures de travail manuel.',
      content: `## Les LLM comme outil d'automatisation

On associe souvent les LLM (Large Language Models) à ChatGPT et aux chatbots. Mais leur vraie puissance est ailleurs : **automatiser des tâches qui nécessitaient jusqu'ici un jugement humain**.

Voici 5 cas d'usage concrets que vous pouvez implémenter en quelques heures.

## Cas 1 : Extraction de données depuis du texte non structuré

Vous recevez des emails, des PDF, des notes clients — et vous devez en extraire des infos structurées. Un LLM fait ça parfaitement.

\`\`\`javascript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

async function extractFromEmail(emailText) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: \`Extrais ces informations de l'email suivant au format JSON :
- nom du client
- budget mentionné (null si absent)
- date souhaitée (null si absente)
- type de projet

Email : \${emailText}\`
    }]
  })
  return JSON.parse(response.content[0].text)
}
\`\`\`

## Cas 2 : Triage et classification automatique

Vous avez un flux de tickets support ou de leads entrants ? Un LLM peut les classifier automatiquement.

\`\`\`javascript
async function classifyTicket(ticketText) {
  const categories = ['bug', 'feature_request', 'billing', 'other']
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 50,
    messages: [{
      role: 'user',
      content: \`Classe ce ticket dans une de ces catégories : \${categories.join(', ')}.
Réponds uniquement avec le nom de la catégorie.

Ticket : \${ticketText}\`
    }]
  })
  return response.content[0].text.trim()
}
\`\`\`

## Cas 3 : Génération de résumés automatiques

Résumer des réunions, des articles, des rapports — sans lire chaque mot.

\`\`\`javascript
async function summarize(text, lang = 'fr') {
  const instruction = lang === 'fr'
    ? 'Résume en 3 points clés (bullet points) en français.'
    : 'Summarize in 3 key bullet points in English.'

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    messages: [{ role: 'user', content: \`\${instruction}\n\n\${text}\` }]
  })
  return response.content[0].text
}
\`\`\`

## Cas 4 : Validation et correction de données

Vous avez un formulaire ou un import CSV avec des données sales ? Un LLM peut corriger et valider.

\`\`\`javascript
async function normalizeAddress(rawAddress) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: \`Normalise cette adresse au format standard (numéro, rue, code postal, ville, pays).
Réponds uniquement avec le JSON : { "street": "...", "zip": "...", "city": "...", "country": "..." }

Adresse brute : \${rawAddress}\`
    }]
  })
  return JSON.parse(response.content[0].text)
}
\`\`\`

## Cas 5 : Génération de contenu contextualisé

Générer des emails de relance, des descriptions produits, des réponses personnalisées — à grande échelle.

\`\`\`javascript
async function generateFollowUp(clientName, projectType, daysSinceMeeting) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    messages: [{
      role: 'user',
      content: \`Écris un email de relance professionnel et chaleureux pour \${clientName}.
Contexte : on a discuté d'un projet \${projectType} il y a \${daysSinceMeeting} jours.
Ton : professionnel mais humain. 3-4 phrases max.\`
    }]
  })
  return response.content[0].text
}
\`\`\`

## Bonnes pratiques pour l'automatisation LLM

**1. Toujours valider la sortie**
Les LLM peuvent halluciner. Validez le JSON retourné, les types de données, les valeurs hors plage.

**2. Préférer des sorties structurées**
Demandez du JSON plutôt que du texte libre. C'est plus facile à intégrer dans votre pipeline.

**3. Gérer les coûts**
Un appel API coûte entre $0.001 et $0.01 selon le modèle et le volume. Loguez vos tokens pour maîtriser la facture.

**4. Rate limiting et retries**
Implémentez un backoff exponentiel si vous faites beaucoup d'appels en parallèle.

## Par où commencer ?

Choisissez une tâche répétitive dans votre workflow actuel. Si elle prend plus de 2 heures par semaine et implique de la compréhension de texte, un LLM peut probablement l'automatiser.

Le ROI est rapide : quelques heures d'intégration pour économiser des dizaines d'heures par mois.`,
    },
    en: {
      title: 'Automating with LLMs: Concrete First Steps',
      excerpt: 'LLMs aren\'t just for chatbots. Here are 5 real use cases where an API call to GPT-4 or Claude replaces hours of manual work.',
      content: `## LLMs as Automation Tools

We often associate LLMs (Large Language Models) with ChatGPT and chatbots. But their real power lies elsewhere: **automating tasks that previously required human judgment**.

Here are 5 concrete use cases you can implement in a few hours.

## Use case 1: Extract data from unstructured text

You receive emails, PDFs, client notes — and need to extract structured info. An LLM does this perfectly.

\`\`\`javascript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

async function extractFromEmail(emailText) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: \`Extract these fields from the email as JSON:
- client name
- budget mentioned (null if absent)
- desired date (null if absent)
- project type

Email: \${emailText}\`
    }]
  })
  return JSON.parse(response.content[0].text)
}
\`\`\`

## Use case 2: Automatic triage and classification

You have a stream of support tickets or inbound leads? An LLM can classify them automatically.

\`\`\`javascript
async function classifyTicket(ticketText) {
  const categories = ['bug', 'feature_request', 'billing', 'other']
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 50,
    messages: [{
      role: 'user',
      content: \`Classify this ticket into one of these categories: \${categories.join(', ')}.
Reply with only the category name.

Ticket: \${ticketText}\`
    }]
  })
  return response.content[0].text.trim()
}
\`\`\`

## Use case 3: Automatic summaries

Summarize meetings, articles, reports — without reading every word.

\`\`\`javascript
async function summarize(text) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: \`Summarize in 3 key bullet points.\n\n\${text}\`
    }]
  })
  return response.content[0].text
}
\`\`\`

## Use case 4: Data validation and correction

Got a form or CSV import with dirty data? An LLM can correct and validate it.

\`\`\`javascript
async function normalizeAddress(rawAddress) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: \`Normalize this address to the standard format.
Reply only with JSON: { "street": "...", "zip": "...", "city": "...", "country": "..." }

Raw address: \${rawAddress}\`
    }]
  })
  return JSON.parse(response.content[0].text)
}
\`\`\`

## Use case 5: Contextualized content generation

Generate follow-up emails, product descriptions, personalized replies — at scale.

\`\`\`javascript
async function generateFollowUp(clientName, projectType, daysSinceMeeting) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    messages: [{
      role: 'user',
      content: \`Write a professional and warm follow-up email for \${clientName}.
Context: we discussed a \${projectType} project \${daysSinceMeeting} days ago.
Tone: professional but human. 3-4 sentences max.\`
    }]
  })
  return response.content[0].text
}
\`\`\`

## Best practices for LLM automation

**1. Always validate the output**
LLMs can hallucinate. Validate returned JSON, data types, out-of-range values.

**2. Prefer structured outputs**
Ask for JSON rather than free text. It's easier to integrate in your pipeline.

**3. Manage costs**
One API call costs between $0.001 and $0.01 depending on the model and volume. Log your tokens to control the bill.

**4. Rate limiting and retries**
Implement exponential backoff if you're making many parallel calls.

## Where to start?

Pick a repetitive task in your current workflow. If it takes more than 2 hours per week and involves text comprehension, an LLM can probably automate it.

The ROI is quick: a few hours of integration to save dozens of hours per month.`,
    },
  },
  {
    slug: 'ia-dans-le-workflow-dev-outils-pratiques',
    category: 'ia',
    tags: ['IA', 'Productivité', 'Outils', 'Dev'],
    date: '2026-04-22',
    readTime: 5,
    fr: {
      title: 'IA dans le workflow dev : les outils qui changent vraiment les choses',
      excerpt: 'Pas de hype, juste des outils IA que j\'utilise au quotidien et qui ont réduit mon temps sur les tâches répétitives de 40%. Avec les cas où ils ne servent à rien.',
      content: `## Ce que l'IA fait bien (et ce qu'elle fait mal)

Avant la liste d'outils, une honnêteté s'impose : l'IA est excellente pour certaines tâches et inutile pour d'autres.

**Elle est bonne pour :**
- Générer du code boilerplate (CRUD, formulaires, configs)
- Expliquer du code inconnu rapidement
- Écrire des tests unitaires sur du code existant
- Traduire des snippets entre langages
- Résumer de la documentation

**Elle est mauvaise pour :**
- La logique métier complexe (elle hallucine)
- Débugger des problèmes de race condition ou de concurrence
- Comprendre le contexte métier de votre domaine
- Prendre des décisions d'architecture sur un projet existant

## Les outils que j'utilise vraiment

### Claude Code (CLI)

L'outil qui a changé ma façon de travailler. Claude Code est un agent IA qui opère directement dans votre terminal et votre codebase.

Ce que je lui demande au quotidien :
- **Refactoring** : "extrais cette logique dans un hook personnalisé"
- **Debugging** : "pourquoi ce composant re-render inutilement ?"
- **Documentation** : "génère le JSDoc pour toutes ces fonctions"
- **Tests** : "écris les tests unitaires pour ce module"

La différence avec un chatbot : il lit vos fichiers, comprend le contexte de votre projet, et fait les modifications directement.

### GitHub Copilot (dans VS Code)

Utile pour l'autocomplétion intelligente, surtout sur :
- Les patterns répétitifs (map, filter, reduce)
- Les regex
- Les requêtes SQL

**Conseil** : ne pas l'accepter aveuglément. Il propose souvent une solution qui compile mais qui n'est pas la bonne pour votre contexte.

### Cursor (éditeur IA-first)

Alternative à VS Code avec l'IA profondément intégrée. Le mode "Composer" permet d'éditer plusieurs fichiers en une seule instruction.

Idéal pour : migrer des composants Class en fonctionnel, renommer des variables project-wide, adapter du code à une nouvelle API.

### Gemini 1.5 Pro (pour les contextes longs)

Quand j'ai besoin d'analyser un fichier de 10 000 lignes ou de comparer plusieurs fichiers simultanément, Gemini 1.5 Pro avec son contexte de 1M de tokens est imbattable.

Cas d'usage : auditer une base de code complète, trouver les patterns d'une API mal documentée, analyser des logs volumineux.

## Mon workflow quotidien avec l'IA

\`\`\`
1. Planifier manuellement (l'IA ne comprend pas vos vraies priorités)
2. Générer le boilerplate avec Claude Code
3. Réviser et adapter chaque suggestion
4. Utiliser Copilot pour l'autocomplétion fine
5. Tester manuellement les points critiques
\`\`\`

## Ce qu'on ne dit pas assez

L'IA accélère, elle ne remplace pas le jugement. Un junior qui utilise Copilot sans comprendre le code généré produit une dette technique massive.

La vraie compétence à développer : **savoir évaluer ce que l'IA génère**. Pour ça, il faut comprendre le code, pas juste l'exécuter.`,
    },
    en: {
      title: 'AI in the Dev Workflow: Tools That Actually Change Things',
      excerpt: 'No hype — just AI tools I use daily that cut my time on repetitive tasks by 40%. With the cases where they\'re useless.',
      content: `## What AI Does Well (and What It Doesn't)

Before the tool list, some honesty: AI is excellent for certain tasks and useless for others.

**It's good at:**
- Generating boilerplate code (CRUD, forms, configs)
- Quickly explaining unfamiliar code
- Writing unit tests on existing code
- Translating snippets between languages
- Summarizing documentation

**It's bad at:**
- Complex business logic (it hallucinates)
- Debugging race conditions or concurrency issues
- Understanding your domain's business context
- Making architecture decisions on an existing project

## Tools I actually use

### Claude Code (CLI)

The tool that changed how I work. Claude Code is an AI agent that operates directly in your terminal and codebase.

What I ask it daily:
- **Refactoring**: "extract this logic into a custom hook"
- **Debugging**: "why is this component re-rendering unnecessarily?"
- **Documentation**: "generate JSDoc for all these functions"
- **Tests**: "write unit tests for this module"

The difference from a chatbot: it reads your files, understands your project context, and makes the changes directly.

### GitHub Copilot (in VS Code)

Useful for smart autocompletion, especially on:
- Repetitive patterns (map, filter, reduce)
- Regex
- SQL queries

**Tip**: don't accept it blindly. It often suggests a solution that compiles but isn't right for your context.

### Cursor (AI-first editor)

Alternative to VS Code with deeply integrated AI. "Composer" mode lets you edit multiple files with a single instruction.

Best for: migrating Class components to functional, renaming project-wide variables, adapting code to a new API.

### Gemini 1.5 Pro (for long contexts)

When I need to analyze a 10,000-line file or compare multiple files simultaneously, Gemini 1.5 Pro with its 1M token context is unbeatable.

Use case: auditing an entire codebase, finding patterns in a poorly documented API, analyzing large logs.

## My daily AI workflow

\`\`\`
1. Plan manually (AI doesn't understand your real priorities)
2. Generate boilerplate with Claude Code
3. Review and adapt every suggestion
4. Use Copilot for fine autocompletion
5. Manually test critical points
\`\`\`

## What nobody talks about enough

AI accelerates, it doesn't replace judgment. A junior using Copilot without understanding the generated code produces massive technical debt.

The real skill to develop: **knowing how to evaluate what AI generates**. For that, you need to understand the code, not just run it.`,
    },
  },
  {
    slug: 'tarifs-freelance-comment-fixer-son-prix',
    category: 'freelance',
    tags: ['Freelance', 'Tarifs', 'Business', 'Facturation'],
    date: '2026-02-10',
    readTime: 7,
    fr: {
      title: 'Tarifs freelance : comment fixer son prix sans se sous-estimer',
      excerpt: 'Fixer son TJM (Taux Journalier Moyen) est l\'une des décisions les plus difficiles en freelance. Voici une méthode concrète pour calculer un tarif juste — sans panique et sans se brader.',
      content: `## Le problème du prix en freelance

La grande majorité des freelances débutants fixent leur prix en regardant ce que font les autres. Résultat : ils s'alignent sur le moins-disant, se sous-estiment, et travaillent beaucoup pour gagner peu.

La bonne approche part de l'autre sens : **combien ai-je besoin de gagner, et combien de jours facturables ai-je par an ?**

## Étape 1 : Calculer votre charge réelle

Un freelance ne travaille pas 365 jours par an. Voici une estimation réaliste :

| Poste | Jours |
|---|---|
| Jours ouvrés dans l'année | 250 |
| Congés et jours fériés | - 30 |
| Prospection et admin | - 30 |
| Formation / veille | - 10 |
| **Jours facturables réels** | **~180** |

Soit **15 jours facturables par mois** en moyenne.

## Étape 2 : Calculer votre revenu cible

Partez de ce que vous voulez toucher **net par mois** après charges.

En France, un freelance en portage salarial ou micro-entreprise supporte environ 45-55% de charges (cotisations, impôts, mutuelle, etc.).

\`\`\`
Revenu net souhaité : 3 000 €/mois
Charges estimées : 50%
Chiffre d'affaires nécessaire : 3 000 / 0.50 = 6 000 €/mois
TJM minimum : 6 000 / 15 jours = 400 €/jour
\`\`\`

Ce 400 €/jour est votre **plancher absolu**. Vous ne descendez pas en dessous.

## Étape 3 : Valider avec le marché

Maintenant que vous avez votre plancher, vérifiez que le marché supporte ce tarif pour votre profil.

**Développeur full-stack (React/Node) en France :**
- Junior (0-2 ans) : 300-450 €/j
- Intermédiaire (2-5 ans) : 450-650 €/j
- Senior (5+ ans) : 650-900 €/j
- Expert / niche technique : 900-1 200 €/j

Si votre plancher est en dessous de la fourchette marché — bonne nouvelle, vous avez de la marge. Si votre plancher dépasse la fourchette, vous devez soit réduire vos charges, soit monter en compétences pour justifier le tarif.

## Étape 4 : Adapter selon le contexte

Le TJM n'est pas gravé dans le marbre. Il varie selon :

**À la hausse :**
- Mission urgente (+ 20 à 30 %)
- Déplacement (+ frais ou + tarif)
- Technologie rare ou compétence pointue
- Client grand compte

**À la baisse (mais attention) :**
- Mission longue durée (6+ mois) → -10 à -15% max
- Projet open source ou association (choix délibéré)
- Mission qui ouvre sur d'autres opportunités

Ne baissez jamais votre tarif par peur de perdre un client. Si vous bradez, vous attirez des clients qui cherchent le prix le plus bas — et vous les gardez.

## Erreurs fréquentes à éviter

**1. Facturer à l'heure**
Facturer à l'heure vous pénalise quand vous êtes efficace. Un senior résout en 2 heures ce qu'un junior met 8 heures à faire. Facturez à la valeur, pas au temps.

**2. Oublier les temps non facturables**
Réunions, emails, révisions, corrections d'incompréhensions — comptez-les dans votre tarif, pas dans votre marge.

**3. Baisser son tarif pour fidéliser**
La fidélisation se joue sur la qualité, la communication et la fiabilité. Pas sur le prix.

**4. Ne pas réviser son tarif**
Augmentez votre TJM chaque année (+5 à +10%). L'inflation, l'expérience et l'inflation justifient cette révision. Prévenez vos clients 1 à 2 mois à l'avance.

## Le bon état d'esprit

Votre tarif reflète votre valeur, pas votre confort. Un client qui négocie agressivement sur le prix cherche rarement un partenaire — il cherche le moins cher.

Les bons clients paient correctement parce qu'ils comprennent ce qu'ils achètent.`,
    },
    en: {
      title: 'Freelance Rates: How to Set Your Price Without Undervaluing Yourself',
      excerpt: 'Setting your daily rate is one of the hardest decisions in freelancing. Here\'s a concrete method to calculate a fair price — without panic and without underselling yourself.',
      content: `## The Freelance Pricing Problem

The vast majority of beginner freelancers set their price by looking at what others charge. Result: they align with the lowest bidder, undervalue themselves, and work a lot for little pay.

The right approach goes the other way: **how much do I need to earn, and how many billable days do I have per year?**

## Step 1: Calculate your real workload

A freelancer doesn't work 365 days a year. Here's a realistic estimate:

| Item | Days |
|---|---|
| Working days in a year | 250 |
| Vacation and holidays | - 30 |
| Prospecting and admin | - 30 |
| Training / monitoring | - 10 |
| **Actual billable days** | **~180** |

That's **~15 billable days per month** on average.

## Step 2: Calculate your target income

Start from what you want to take home **net per month** after expenses.

A freelancer typically handles 30-45% in taxes and expenses (self-employment tax, health insurance, software, etc.).

\`\`\`
Target net income: $5,000/month
Estimated expenses: 40%
Required revenue: $5,000 / 0.60 = $8,333/month
Minimum daily rate: $8,333 / 15 days = ~$555/day
\`\`\`

This is your **absolute floor**. You don't go below it.

## Step 3: Validate against the market

Now that you have your floor, check that the market supports this rate for your profile.

**Full-stack developer (React/Node) rates:**
- Junior (0-2 years): $300-500/day
- Mid-level (2-5 years): $500-750/day
- Senior (5+ years): $750-1,100/day
- Expert / niche tech: $1,100-1,500/day

If your floor is below the market range — good news, you have room. If your floor exceeds the range, you either need to reduce costs or level up to justify the rate.

## Step 4: Adjust by context

Your daily rate isn't set in stone. It varies:

**Upward:**
- Urgent mission (+20 to 30%)
- Travel required (+expenses or +rate)
- Rare technology or specialized skill
- Enterprise client

**Downward (be careful):**
- Long-term engagement (6+ months) → -10 to -15% max
- Open source project or non-profit (deliberate choice)
- Mission that opens other opportunities

Never lower your rate out of fear of losing a client. If you undercut, you attract clients who only care about price — and you keep them.

## Common mistakes to avoid

**1. Billing by the hour**
Hourly billing penalizes you when you're efficient. A senior resolves in 2 hours what a junior takes 8 hours to do. Bill for value, not time.

**2. Forgetting non-billable time**
Meetings, emails, revisions, misunderstanding corrections — factor them into your rate, not your margin.

**3. Dropping your rate to retain clients**
Retention is about quality, communication and reliability. Not price.

**4. Not revising your rate**
Increase your daily rate every year (+5 to +10%). Inflation, experience and market demand justify this. Warn clients 1-2 months in advance.

## The right mindset

Your rate reflects your value, not your comfort zone. A client who aggressively negotiates on price rarely wants a partner — they want the cheapest option.

Good clients pay fairly because they understand what they're buying.`,
    },
  },
  {
    slug: 'ma-methode-de-travail-freelance',
    category: 'freelance',
    tags: ['Freelance', 'Méthode', 'Organisation', 'Client'],
    date: '2026-05-03',
    readTime: 6,
    fr: {
      title: 'Ma méthode de travail en freelance : du premier contact à la livraison',
      excerpt: 'Comment je structure chaque projet pour éviter les malentendus, livrer dans les délais et avoir des clients satisfaits. Un process reproductible, pas du bricolage.',
      content: `## Pourquoi avoir une méthode

Au début du freelance, on accepte tout, on s'adapte à chaque client, on improvise. Résultat : des projets flous, des délais ratés, des désaccords en fin de mission.

Après plusieurs projets, j'ai structuré un process clair. Pas pour être rigide, mais pour protéger à la fois le client et moi.

## Phase 1 : Premier contact et qualification (J1 - J3)

### L'appel de découverte (30 min)

Je ne propose jamais un devis sans cet appel. Il me permet de comprendre :
- Quel est le problème réel (pas juste la solution imaginée)
- Quel est le budget estimé
- Quelle est la deadline réelle
- Qui prend les décisions

**Questions que je pose systématiquement :**
- "Qu'est-ce qui se passe si ce projet n'existe pas dans 6 mois ?"
- "Avez-vous déjà travaillé avec un freelance ? Comment ça s'est passé ?"
- "Qui d'autre est impliqué dans la validation ?"

Ces questions révèlent vite si le projet est sérieux ou non.

### La qualification rapide

Je décline poliment si :
- Le budget est inférieur à mon seuil de rentabilité
- Le client ne sait pas ce qu'il veut (projet "agile" sans direction)
- La deadline est irréaliste et non négociable
- Je sens un problème de communication dès le premier échange

Mieux vaut un projet refusé qu'un projet cauchemar.

## Phase 2 : Cadrage et devis (J3 - J7)

### La proposition écrite

Je livre une proposition en PDF qui inclut :
- La reformulation du besoin (pour valider qu'on parle de la même chose)
- Le périmètre précis (ce qui est inclus ET ce qui ne l'est pas)
- Les livrables attendus
- Le planning par étapes
- Le prix total et les modalités de paiement
- Les conditions : nombre de révisions, délai de retour client, etc.

**La clause "hors périmètre"** : toute demande non incluse dans la proposition fait l'objet d'un avenant. Cela protège les deux parties.

### Les modalités de paiement

Je travaille en général avec :
- 30% à la signature (acompte)
- 40% à mi-projet (livraison intermédiaire)
- 30% à la livraison finale

Jamais 100% à la fin. Cette structure motive le client à valider rapidement et me protège d'un abandon de projet.

## Phase 3 : Développement (variable)

### Le rythme de communication

Je fixe un point hebdomadaire de 20-30 minutes maximum. Pas plus : trop de réunions tue la productivité.

Entre ces points, j'envoie un court update écrit chaque vendredi :
- Ce qui a été fait cette semaine
- Ce qui est prévu la semaine suivante
- Les blocages éventuels (et ce que j'attends du client)

### La gestion des demandes en cours de route

Les clients changent d'avis — c'est normal. La règle est simple : **toute modification au périmètre initial est discutée avant d'être implémentée**.

Je réponds systématiquement : "Bien sûr, je peux faire ça. Voici l'impact sur le planning et le budget."

Jamais : "OK je le fais" sans évaluer l'impact.

## Phase 4 : Livraison et clôture

### La recette client

Avant la livraison finale, je prépare un document de recette listant tous les points à valider. Le client teste et valide ou retourne ses retours par écrit.

Cela évite le syndrome du "j'avais oublié de dire que..." deux semaines après la livraison.

### Le bilan de projet

Après chaque projet, j'envoie un court email de bilan :
- Ce qu'on a livré
- Ce que j'ai appris
- Une question : "Y a-t-il quelque chose que j'aurais pu faire différemment ?"

Ce feedback améliore ma méthode et montre au client que je prends son avis au sérieux.

## Ce que cette méthode m'a apporté

- Moins de malentendus et de conflits
- Des projets livrés dans les délais (>90% du temps)
- Des clients qui reviennent et recommandent
- Une sérénité dans le travail

La structure ne tue pas la créativité. Elle la rend possible en éliminant le chaos.`,
    },
    en: {
      title: 'My Freelance Work Method: From First Contact to Delivery',
      excerpt: 'How I structure every project to avoid misunderstandings, deliver on time, and have satisfied clients. A repeatable process, not improvisation.',
      content: `## Why Have a Method

At the start of freelancing, you accept everything, adapt to each client, improvise. Result: vague projects, missed deadlines, disagreements at the end.

After several projects, I structured a clear process. Not to be rigid, but to protect both the client and myself.

## Phase 1: First Contact and Qualification (Day 1-3)

### The Discovery Call (30 min)

I never propose a quote without this call. It lets me understand:
- What the real problem is (not just the imagined solution)
- What the estimated budget is
- What the real deadline is
- Who makes the decisions

**Questions I always ask:**
- "What happens if this project doesn't exist in 6 months?"
- "Have you worked with a freelancer before? How did it go?"
- "Who else is involved in sign-off?"

These questions quickly reveal whether the project is serious.

### Quick qualification

I politely decline if:
- The budget is below my profitability threshold
- The client doesn't know what they want ("agile" project with no direction)
- The deadline is unrealistic and non-negotiable
- I sense a communication problem from the first exchange

A rejected project is better than a nightmare project.

## Phase 2: Scoping and Quote (Day 3-7)

### The Written Proposal

I deliver a PDF proposal that includes:
- A restatement of the need (to confirm we're talking about the same thing)
- The precise scope (what's included AND what's not)
- Expected deliverables
- A phased schedule
- Total price and payment terms
- Conditions: number of revisions, client response time, etc.

**The "out of scope" clause**: any request not included in the proposal requires a change order. This protects both parties.

### Payment terms

I typically work with:
- 30% upon signing (deposit)
- 40% at mid-project (intermediate delivery)
- 30% upon final delivery

Never 100% at the end. This structure motivates the client to validate quickly and protects me from project abandonment.

## Phase 3: Development (variable)

### Communication rhythm

I schedule a weekly check-in of 20-30 minutes maximum. No more — too many meetings kills productivity.

Between check-ins, I send a short written update every Friday:
- What was done this week
- What's planned next week
- Any blockers (and what I need from the client)

### Managing mid-project requests

Clients change their minds — that's normal. The rule is simple: **any change to the initial scope is discussed before implementation**.

My standard response: "Sure, I can do that. Here's the impact on the schedule and budget."

Never: "OK I'll do it" without assessing the impact.

## Phase 4: Delivery and Closing

### Client acceptance

Before final delivery, I prepare an acceptance document listing all points to validate. The client tests and approves or returns feedback in writing.

This avoids the "I forgot to mention..." syndrome two weeks after delivery.

### Project retrospective

After each project, I send a short recap email:
- What we delivered
- What I learned
- One question: "Is there anything I could have done differently?"

This feedback improves my method and shows the client I take their input seriously.

## What this method gave me

- Fewer misunderstandings and conflicts
- Projects delivered on time (>90% of the time)
- Clients who come back and refer others
- Peace of mind in the work

Structure doesn't kill creativity. It enables it by eliminating chaos.`,
    },
  },
]

export const categories = {
  performance: { fr: 'Performance & SEO', en: 'Performance & SEO', color: 'blue' },
  ia: { fr: 'IA & Automatisation', en: 'AI & Automation', color: 'purple' },
  freelance: { fr: 'Freelance & Business', en: 'Freelance & Business', color: 'green' },
}
