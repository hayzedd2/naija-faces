import sharp from 'sharp'
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
const OUT = 'public/og.png'

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

const face = await renderFace()
const faceB64 = face.toString('base64')

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${CREAM}" />
  <rect x="28" y="28" width="${WIDTH - 56}" height="${HEIGHT - 56}" rx="26" fill="none" stroke="${LINE}" stroke-width="2" />

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

await sharp(Buffer.from(overlay)).png({ compressionLevel: 9 }).toFile(OUT)

console.log(`wrote ${OUT}`)
