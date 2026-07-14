import puppeteer from 'puppeteer'
import { createServer } from 'vite'
import fs from 'fs'
import path from 'path'

const routes = ['/', '/services', '/realisations', '/profil', '/contact']

const server = await createServer({
  root: process.cwd(),
  build: { outDir: 'dist' },
  preview: false,
  server: { port: 5199 },
  configFile: false,
  plugins: [],
})

// Serve dist statically instead
import { createServer as httpServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { extname, join } from 'path'

await server.close()

const DIST = path.resolve('dist')
const PORT = 5199

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

const staticServer = httpServer((req, res) => {
  let urlPath = req.url.split('?')[0]
  let filePath = join(DIST, urlPath)

  if (!existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = join(DIST, 'index.html')
  }

  const ext = extname(filePath)
  res.setHeader('Content-Type', mime[ext] || 'text/plain')
  res.end(readFileSync(filePath))
})

await new Promise((r) => staticServer.listen(PORT, r))

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

for (const route of routes) {
  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
  const html = await page.content()
  await page.close()

  const dir = path.join(DIST, route === '/' ? '' : route)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8')
  console.log(`✅  prerendered ${route}`)
}

await browser.close()
staticServer.close()
console.log('🎉  prerender done')
