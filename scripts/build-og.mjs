import sharp from 'sharp'
import handler from '../api/face.js'

const WIDTH = 1200
const HEIGHT = 630
const CREAM = '#f4efe6'
const CARD = '#efe6d5'
const INK = '#211c17'
const MUTED = '#6f6559'
const FACE_CODE = '280011000000101100'

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
  await handler(
    { url: `/face/${FACE_CODE}?format=svg&size=820` },
    res,
  )
  if (res.statusCode !== 200 || typeof getBody() !== 'string') {
    throw new Error(`Face render failed with status ${res.statusCode}`)
  }

  // Drop the composition's background rects so the portrait floats on the OG card.
  const svg = getBody().replace(/<rect width="512" height="512"[^>]*\/?>(?:<\/rect>)?/g, '')
  return sharp(Buffer.from(svg)).resize(820, 820).png().toBuffer()
}

const face = await renderFace()
const faceB64 = face.toString('base64')

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${CREAM}" />
  <rect x="28" y="28" width="${WIDTH - 56}" height="${HEIGHT - 56}" rx="26" fill="none" stroke="#e6dccb" stroke-width="2" />

  <g transform="translate(64 54)">
    <rect width="52" height="52" rx="15" fill="${INK}" />
    <circle cx="26" cy="28" r="13.65" fill="#c78f64" />
    <path d="M12.35 24.05c0-8.58 5.98-13.26 13.65-13.26s13.65 4.68 13.65 13.26c-3.77-3.77-7.8-5.2-13.65-5.2s-9.88 1.43-13.65 5.2Z" fill="${CREAM}" />
    <circle cx="21.06" cy="28.6" r="1.885" fill="${INK}" />
    <circle cx="30.94" cy="28.6" r="1.885" fill="${INK}" />
    <path d="M22.1 33.8c2.47 1.82 5.33 1.82 7.8 0" stroke="${INK}" stroke-width="1.95" fill="none" stroke-linecap="round" />
  </g>
  <text x="132" y="92" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="${INK}">Naija Faces</text>

  <circle cx="600" cy="330" r="206" fill="${CARD}" />
  <defs>
    <clipPath id="og-face"><circle cx="600" cy="330" r="206" /></clipPath>
  </defs>
  <image href="data:image/png;base64,${faceB64}" x="394" y="124" width="412" height="412" preserveAspectRatio="xMidYMid slice" clip-path="url(#og-face)" />

  <text x="600" y="592" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" letter-spacing="0.04em" fill="${MUTED}">Make a face that looks like you.</text>
</svg>`

await sharp(Buffer.from(overlay)).png({ compressionLevel: 9 }).toFile('public/og.png')

console.log('wrote public/og.png')
