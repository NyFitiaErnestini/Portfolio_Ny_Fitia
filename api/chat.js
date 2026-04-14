export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, history = [], lang = 'fr' } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message required' })
  }

  const GEMINI_KEY = process.env.GEMINI_API_KEY
  const langInstruction = lang.startsWith('en')
    ? 'Always reply in English.'
    : 'Réponds toujours en français.'

  const systemPrompt = `Tu es l'assistant virtuel de Ny Fitia Ernestini, développeur Full-Stack basé à Madagascar.
Réponds toujours de manière concise, professionnelle et chaleureuse. Maximum 3-4 phrases par réponse.
${langInstruction}

À propos de Ny Fitia :
- Développeur Full-Stack disponible pour de nouveaux projets
- Spécialités : React, Node.js, PHP/Symfony, PostgreSQL, Docker, WebSocket
- Expériences : Développeur Full-Stack chez E-media (remote, France, depuis jan 2026), stage Backend chez eTech Consulting (juin-sept 2025)
- Formation : 42 Antananarivo (algorithmique, C/C++), Master en Informatique CNTEMAD, Licence en Informatique (BDD & Génie Logiciel)
- Contact : ernestininyfitia@gmail.com | +261 34 23 396 77 | WhatsApp disponible
- LinkedIn : linkedin.com/in/ny-fitia-ernestini-7976a726a
- Malt : malt.fr/profile/nyfitiaernestini1

Services proposés :
1. Création d'applications web sur mesure (React, Node.js, Symfony)
2. Conception de backend & APIs fiables (REST, WebSocket, sécurité)
3. Amélioration des performances web (Lighthouse +90, SEO)
4. Automatisation & logique métier (-80% tâches manuelles)

Projets réalisés :
- Sakalava Lodge : optimisation SEO et performances (+90 score mobile)
- ft_transcendence : app web multijoueur temps réel (Pong), rôle : BDD + dashboard + système d'amis
- OaaS : architecture modulaire et scalable
- eTalk : plateforme avec WebSocket et Mercure (github.com/NyFitiaErnestini/e-Talk)
- Bibliothèque en ligne : gestion catalogue PHP/JavaScript

Si on te demande les tarifs, dis que Ny Fitia propose un devis personnalisé selon le projet et invite à le contacter directement.
Ne réponds qu'aux questions liées à Ny Fitia, ses services, compétences ou projets. Pour tout autre sujet, redirige poliment vers le contact.`

  try {
    const contents = [
      ...history.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { maxOutputTokens: 256, temperature: 0.7 },
        }),
      }
    )

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) throw new Error('No response from Gemini')

    return res.status(200).json({ reply: text })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
