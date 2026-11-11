import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import puppeteer from 'puppeteer'
import handler from '../api/face.js'

const WIDTH = 1200
const HEIGHT = 630
const CREAM = '#f4efe6'
const CARD = '#efe6d5'
const INK = '#211c17'
const MUTED = '#6f6559'
const FAINT = '#a89a88'
const LINE = '#e6dccb'
const FACE_CODE = '22036231303251130a'
const APP_URL = 'https://naija-faces.vercel.app/'

function captureResponse() {
  let body
  const res = {
    statusCode: 0,
    setHeader() {},
    end(value) {
      body = value
    },
  }
  return { res, getBody: () => body }
}

async function renderFace() {
  const { res, getBody } = captureResponse()
  await handler({ url: `/face/${FACE_CODE}?format=svg&size=820` }, res)
  if (res.statusCode !== 200 || typeof getBody() !== 'string') {
    throw new Error(`Face render failed with status ${res.statusCode}`)
  }

  // Drop the composition's background rects so the portrait floats on the OG card.
  const svg = getBody().replace(/<rect width="512" height="512"[^>]*\/?>(?:<\/rect>)?/g, '')
  return sharp(Buffer.from(svg)).resize(820, 820).png().toBuffer()
}

function logo(x, y, size) {
  const scale = size / 40
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <rect width="40" height="40" rx="12" fill="${INK}" />
    <circle cx="20" cy="21.5" r="10.5" fill="#c78f64" />
    <path d="M9.5 18.5c0-6.6 4.6-10.2 10.5-10.2s10.5 3.6 10.5 10.2c-2.9-2.9-6-4-10.5-4s-7.6 1.1-10.5 4Z" fill="${CREAM}" />
    <circle cx="16.2" cy="22" r="1.45" fill="${INK}" />
    <circle cx="23.8" cy="22" r="1.45" fill="${INK}" />
    <path d="M17 26c1.9 1.4 4.1 1.4 6 0" stroke="${INK}" stroke-width="1.5" fill="none" stroke-linecap="round" />
  </g>`
}

function frame() {
  return `<rect width="${WIDTH}" height="${HEIGHT}" fill="${CREAM}" />
    <rect x="28" y="28" width="${WIDTH - 56}" height="${HEIGHT - 56}" rx="26" fill="none" stroke="${LINE}" stroke-width="2" />`
}

function portrait(faceB64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${frame()}
    ${logo(64, 54, 52)}
    <text x="132" y="92" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="${INK}">Naija Faces</text>
    <circle cx="600" cy="330" r="206" fill="${CARD}" />
    <defs><clipPath id="og-face"><circle cx="600" cy="330" r="206" /></clipPath></defs>
    <image href="data:image/png;base64,${faceB64}" x="394" y="124" width="412" height="412" preserveAspectRatio="xMidYMid slice" clip-path="url(#og-face)" />
    <text x="600" y="592" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" letter-spacing="0.04em" fill="${MUTED}">Make a face that looks like you.</text>
  </svg>`
}

function centered() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${frame()}
    ${logo(564, 136, 72)}
    <text x="600" y="292" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="68" fill="${INK}">Naija Faces</text>
    <text x="600" y="360" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" fill="${MUTED}">Mix and match illustrated features, headwear,</text>
    <text x="600" y="394" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" fill="${MUTED}">and adornments to make a portrait that looks like you.</text>
    <text x="600" y="548" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="14" letter-spacing="3" fill="${FAINT}">NAIJA-FACES.VERCEL.APP</text>
  </svg>`
}

function split(faceB64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${frame()}
    ${logo(80, 78, 52)}
    <text x="148" y="116" font-family="Georgia, 'Times New Roman', serif" font-size="38" fill="${INK}">Naija Faces</text>
    <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="76" fill="${INK}">Make a face.</text>
    <text x="80" y="360" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" fill="${MUTED}">Mix and match illustrated features,</text>
    <text x="80" y="394" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" fill="${MUTED}">headwear, and adornments to make</text>
    <text x="80" y="428" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" fill="${MUTED}">a portrait that looks like you.</text>
    <text x="80" y="548" font-family="'Helvetica Neue', Arial, sans-serif" font-size="14" letter-spacing="3" fill="${FAINT}">NAIJA-FACES.VERCEL.APP</text>
    <circle cx="900" cy="315" r="235" fill="${CARD}" />
    <defs><clipPath id="og-face-split"><circle cx="900" cy="315" r="235" /></clipPath></defs>
    <image href="data:image/png;base64,${faceB64}" x="650" y="65" width="500" height="500" preserveAspectRatio="xMidYMid slice" clip-path="url(#og-face-split)" />
  </svg>`
}

async function screenshot(out) {
  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 })
    await page.goto(`${APP_URL}?face=${FACE_CODE}`, { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)
    const shot = await page.screenshot({ type: 'png' })
    await sharp(shot).resize(WIDTH, HEIGHT).png({ compressionLevel: 9 }).toFile(out)
  } finally {
    await browser.close()
  }
}

const variant = process.argv[2] ?? 'split'
const out = process.argv[3] ?? 'public/og.png'
await mkdir(path.dirname(out), { recursive: true })

if (variant === 'screenshot') {
  await screenshot(out)
} else {
  const face = await renderFace()
  const faceB64 = face.toString('base64')
  const overlays = { portrait, centered, split }
  const build = overlays[variant]
  if (!build) throw new Error(`Unknown variant "${variant}". Use portrait, centered, split, or screenshot.`)
  await sharp(Buffer.from(build(faceB64))).png({ compressionLevel: 9 }).toFile(out)
}

console.log(`wrote ${out}`)
