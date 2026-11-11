import type { IncomingMessage, ServerResponse } from 'node:http'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { decodeTraits } from '../src/face/codec'
import { Face } from '../src/face/Face'

const DEFAULT_SIZE = 1024
const MIN_SIZE = 64
const MAX_SIZE = 2048
const HEX = /^#?([0-9a-f]{6})$/i

type Query = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

function readCode(url: URL, query: Query): string {
  const fromQuery = first(query.code) ?? url.searchParams.get('code') ?? ''
  if (fromQuery) return fromQuery

  const parts = url.pathname.split('/').filter(Boolean)
  const last = parts[parts.length - 1] ?? ''
  return last === 'face' ? '' : decodeURIComponent(last)
}

function readSize(url: URL, query: Query): number {
  const raw = first(query.size) ?? url.searchParams.get('size') ?? ''
  const value = Number.parseInt(raw, 10)
  if (!Number.isFinite(value)) return DEFAULT_SIZE
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(value)))
}

function readFormat(url: URL, query: Query): 'svg' | 'png' | 'jpg' {
  const raw = (first(query.format) ?? url.searchParams.get('format') ?? 'svg').toLowerCase()
  if (raw === 'png') return 'png'
  if (raw === 'jpg' || raw === 'jpeg') return 'jpg'
  return 'svg'
}

function readBackground(url: URL, query: Query): string | undefined {
  const raw = first(query.background) ?? first(query.bg) ?? url.searchParams.get('background') ?? ''
  const match = HEX.exec(raw.trim())
  return match ? `#${match[1].toLowerCase()}` : undefined
}

function renderSvg(code: string, size: number, background: string | undefined): string | null {
  const traits = decodeTraits(code)
  if (!traits) return null

  const markup = renderToStaticMarkup(
    createElement(Face, {
      traits,
      background,
      decorative: false,
      svgId: `face-${code}`,
    }),
  )

  // The composition renders at 512×512; expose the requested pixel size.
  return markup.replace('<svg ', `<svg width="${size}" height="${size}" `)
}

function send(res: ServerResponse, status: number, body: string | Buffer, type: string) {
  res.statusCode = status
  res.setHeader('Content-Type', type)
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(body)
}

function fail(res: ServerResponse, status: number, message: string) {
  send(res, status, `${message}\n`, 'text/plain; charset=utf-8')
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const query = ((req as IncomingMessage & { query?: Query }).query ?? {}) as Query
  const url = new URL(req.url ?? '/', 'http://localhost')
  const code = readCode(url, query).trim()
  const size = readSize(url, query)
  const format = readFormat(url, query)
  const background = readBackground(url, query)

  if (!code) return fail(res, 400, 'Missing face code. Use /face/<code>.')

  let svg: string | null
  try {
    svg = renderSvg(code, size, background)
  } catch (error) {
    console.error(error)
    return fail(res, 500, 'Could not render this face.')
  }

  if (!svg) return fail(res, 404, 'Unknown face code.')

  if (format === 'svg') {
    return send(res, 200, svg, 'image/svg+xml; charset=utf-8')
  }

  try {
    const { default: sharp } = await import('sharp')
    const image = sharp(Buffer.from(svg)).resize(size, size)
    const buffer =
      format === 'png'
        ? await image.png().toBuffer()
        : await image.flatten({ background: '#ffffff' }).jpeg({ quality: 92 }).toBuffer()
    return send(res, 200, buffer, format === 'png' ? 'image/png' : 'image/jpeg')
  } catch (error) {
    console.error(error)
    return fail(res, 500, 'Could not encode this image.')
  }
}
