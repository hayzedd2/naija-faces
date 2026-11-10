import {
  DEFAULT_TRAITS,
  OPTION_COUNTS,
  TRAIT_KEYS,
  type Traits,
} from './config'

const VERSION = '2'

const V1_KEYS: (keyof Traits)[] = [
  'skin',
  'face',
  'hair',
  'hairColor',
  'brow',
  'eye',
  'eyeColor',
  'nose',
  'mouth',
  'beard',
  'glasses',
  'earrings',
  'bg',
]

function decodeBody(raw: string, keys: (keyof Traits)[]): Traits | null {
  if (raw.length !== keys.length) return null
  const next: Traits = { ...DEFAULT_TRAITS }
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    const value = Number.parseInt(raw[i], 36)
    if (!Number.isFinite(value) || value < 0 || value >= OPTION_COUNTS[key]) {
      return null
    }
    next[key] = value
  }
  return next
}

export function encodeTraits(traits: Traits): string {
  const body = TRAIT_KEYS.map((key) => {
    const value = Math.max(0, Math.min(35, Math.floor(traits[key])))
    return value.toString(36)
  }).join('')
  return `${VERSION}${body}`
}

export function decodeTraits(code: string | null | undefined): Traits | null {
  if (!code) return null

  if (code.startsWith(VERSION) && code.length === TRAIT_KEYS.length + 1) {
    return decodeBody(code.slice(1), TRAIT_KEYS)
  }
  if (code.startsWith('1') && code.length === V1_KEYS.length + 1) {
    return decodeBody(code.slice(1), V1_KEYS)
  }
  if (code.length === TRAIT_KEYS.length) {
    return decodeBody(code, TRAIT_KEYS)
  }
  if (code.length === V1_KEYS.length) {
    return decodeBody(code, V1_KEYS)
  }
  return null
}

export function traitsFromLocation(): Traits | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return decodeTraits(params.get('face'))
}

export function faceUrl(traits: Traits): string {
  const url = new URL(window.location.href)
  url.searchParams.set('face', encodeTraits(traits))
  return url.toString()
}
