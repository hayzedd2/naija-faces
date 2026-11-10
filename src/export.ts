export type ExportVariant = 'branded' | 'portrait'
export type ExportFormat = 'png' | 'jpg' | 'svg'
export type ExportSize = 1024 | 2048

const SVG_NS = 'http://www.w3.org/2000/svg'
const BRANDED_VIEWBOX = 1080
const CREAM = '#fffdf8'
const INK = '#211c17'
const MARK_SKIN = '#c78f64'

function portraitSource(): SVGSVGElement | null {
  return document.getElementById('portrait-svg') as SVGSVGElement | null
}

function cleanClone(clone: SVGSVGElement, width: number, height: number) {
  clone.removeAttribute('id')
  clone.removeAttribute('class')
  clone.removeAttribute('role')
  clone.removeAttribute('aria-label')
  clone.removeAttribute('aria-hidden')
  clone.setAttribute('xmlns', SVG_NS)
  clone.setAttribute('width', String(width))
  clone.setAttribute('height', String(height))
  clone.setAttribute('viewBox', '0 0 512 512')
}

function stripBackground(clone: SVGSVGElement) {
  const rects = Array.from(clone.children).filter(
    (element) => element.tagName.toLowerCase() === 'rect',
  )
  rects.slice(0, 2).forEach((rect) => rect.remove())
}

function brandMark(x: number, y: number, size: number): string {
  const scale = size / 40
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <rect width="40" height="40" rx="12" fill="${INK}" />
    <circle cx="20" cy="21.5" r="10.5" fill="${MARK_SKIN}" />
    <path d="M9.5 18.5c0-6.6 4.6-10.2 10.5-10.2s10.5 3.6 10.5 10.2c-2.9-2.9-6-4-10.5-4s-7.6 1.1-10.5 4Z" fill="#f4efe6" />
    <circle cx="16.2" cy="22" r="1.45" fill="${INK}" />
    <circle cx="23.8" cy="22" r="1.45" fill="${INK}" />
    <path d="M17 26c1.9 1.4 4.1 1.4 6 0" stroke="${INK}" stroke-width="1.5" fill="none" stroke-linecap="round" />
  </g>`
}

function portraitMarkup(size: number): string | null {
  const clone = portraitSource()?.cloneNode(true) as SVGSVGElement | undefined
  if (!clone) return null
  cleanClone(clone, size, size)
  return new XMLSerializer().serializeToString(clone)
}

function brandedMarkup(background: string, size: number): string | null {
  const clone = portraitSource()?.cloneNode(true) as SVGSVGElement | undefined
  if (!clone) return null

  cleanClone(clone, 860, 860)
  clone.setAttribute('x', '110')
  clone.setAttribute('y', '150')
  stripBackground(clone)
  const portrait = new XMLSerializer().serializeToString(clone)

  return `<svg xmlns="${SVG_NS}" width="${size}" height="${size}" viewBox="0 0 ${BRANDED_VIEWBOX} ${BRANDED_VIEWBOX}">
  <defs>
    <clipPath id="naija-export-circle">
      <circle cx="540" cy="540" r="430" />
    </clipPath>
  </defs>
  <rect width="${BRANDED_VIEWBOX}" height="${BRANDED_VIEWBOX}" fill="${background}" />
  <circle cx="540" cy="540" r="430" fill="${CREAM}" />
  <g clip-path="url(#naija-export-circle)">
    ${portrait}
  </g>
  ${brandMark(64, 64, 80)}
</svg>`
}

export function buildExportSvg(
  variant: ExportVariant,
  size: ExportSize,
  background: string,
): string | null {
  return variant === 'branded' ? brandedMarkup(background, size) : portraitMarkup(size)
}

export function previewUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Could not render export'))
    image.src = src
  })
}

async function rasterize(svg: string, format: 'png' | 'jpg', size: number): Promise<Blob> {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
  try {
    const image = await loadImage(url)
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Canvas is unavailable')
    if (format === 'jpg') {
      context.fillStyle = CREAM
      context.fillRect(0, 0, size, size)
    }
    context.drawImage(image, 0, 0, size, size)
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Could not encode image'))),
        format === 'jpg' ? 'image/jpeg' : 'image/png',
        0.94,
      )
    })
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function exportBlob(
  variant: ExportVariant,
  format: ExportFormat,
  size: ExportSize,
  background: string,
): Promise<{ blob: Blob; extension: string } | null> {
  const svg = buildExportSvg(variant, size, background)
  if (!svg) return null
  if (format === 'svg') {
    return {
      blob: new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }),
      extension: 'svg',
    }
  }
  return {
    blob: await rasterize(svg, format, size),
    extension: format === 'jpg' ? 'jpg' : 'png',
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1200)
}

export function copyBlobToClipboard(blob: Blob): Promise<void> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
    return Promise.reject(new Error('Image clipboard is unavailable'))
  }
  return navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
}
