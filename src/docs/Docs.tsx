import { useMemo, useState } from 'react'
import { BrandMark } from '../components/icons'
import { decodeTraits, encodeTraits } from '../face/codec'
import { randomTraits } from '../face/random'

const DEFAULT_CODE = '22036231303251130a'
const DEFAULT_SIZE = 1024
const MIN_SIZE = 64
const MAX_SIZE = 2048
const HEX = /^#?[0-9a-f]{6}$/i

const FORMATS = [
  { value: 'svg', label: 'SVG' },
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG' },
] as const

type Format = (typeof FORMATS)[number]['value']

function clampSize(value: number): number {
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(value)))
}

export function Docs() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [format, setFormat] = useState<Format>('svg')
  const [sizeInput, setSizeInput] = useState(String(DEFAULT_SIZE))
  const [bgOn, setBgOn] = useState(false)
  const [bg, setBg] = useState('e7a3ad')
  const [copied, setCopied] = useState<'url' | 'html' | null>(null)

  const trimmed = code.trim()
  const valid = Boolean(decodeTraits(trimmed))
  const rawSize = Number(sizeInput)
  const size = Number.isFinite(rawSize) && rawSize > 0 ? clampSize(rawSize) : DEFAULT_SIZE
  const sizeClamped =
    sizeInput.trim() !== '' && (rawSize < MIN_SIZE || rawSize > MAX_SIZE)
  const bgValid = !bgOn || HEX.test(bg.trim())
  const colorValue = HEX.test(bg.trim())
    ? `#${bg.trim().replace('#', '').toLowerCase()}`
    : '#ffffff'

  const path = useMemo(() => {
    const params = new URLSearchParams({ format, size: String(size) })
    if (bgOn && bgValid) params.set('background', bg.trim().replace('#', ''))
    return `/face/${encodeURIComponent(trimmed)}?${params.toString()}`
  }, [bg, bgOn, bgValid, format, size, trimmed])

  const absoluteUrl =
    typeof window === 'undefined' ? path : `${window.location.origin}${path}`
  const html = `<img src="${absoluteUrl}" alt="Naija face" width="${size}" height="${size}" />`

  const copy = async (value: string, key: 'url' | 'html') => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      window.prompt('Copy this', value)
    }
    setCopied(key)
    window.setTimeout(() => setCopied(null), 1600)
  }

  const randomize = () => {
    setCode(encodeTraits(randomTraits()))
  }

  return (
    <div className="docs">
      <header className="docs-top">
        <a className="docs-brand" href="/">
          <BrandMark size={30} />
          <span>Naija Faces</span>
        </a>
        <div className="docs-top-right">
          <span className="docs-tag">Image API</span>
          <a className="docs-app-link" href="/">
            Open app <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main className="docs-main">
        <section className="docs-intro">
          <p className="docs-eyebrow">For developers</p>
          <h1>Portraits from a URL.</h1>
          <p className="docs-lede">
            Every face is a short code. Drop it into an image URL and you get the same
            portrait the app renders — no API key, no account, no build step.
          </p>
        </section>

        <section className="playground" aria-label="Image API playground">
          <div className="preview-card">
            <div className="preview-frame">
              {valid && bgValid ? (
                <img src={path} alt="Face preview" width={size} height={size} />
              ) : (
                <p className="preview-empty">Enter a valid face code to preview.</p>
              )}
            </div>
            <p className="preview-meta">
              {format.toUpperCase()} · {size} × {size}
              {bgOn && bgValid ? ` · #${bg.trim().replace('#', '').toLowerCase()}` : ''}
            </p>
          </div>

          <div className="controls-card">
            <div className="field">
              <div className="field-head">
                <label htmlFor="face-code">Face code</label>
                <button type="button" className="text-button" onClick={randomize}>
                  Randomize
                </button>
              </div>
              <input
                id="face-code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                spellCheck={false}
                autoComplete="off"
                aria-invalid={!valid}
                aria-describedby="code-status"
              />
              <p
                id="code-status"
                className={valid ? 'field-note' : 'field-note is-error'}
              >
                {valid
                  ? 'Valid code.'
                  : 'That code could not be decoded. Copy one from the app URL after ?face=.'}
              </p>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Format</label>
                <div className="segmented" role="group" aria-label="Format">
                  {FORMATS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={format === option.value ? 'is-active' : undefined}
                      aria-pressed={format === option.value}
                      onClick={() => setFormat(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label htmlFor="size">Size</label>
                <div className="size-row">
                  <input
                    id="size"
                    type="number"
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    step={16}
                    value={sizeInput}
                    onChange={(event) => setSizeInput(event.target.value)}
                  />
                  <span className="field-suffix">px</span>
                </div>
                <input
                  className="range"
                  type="range"
                  min={MIN_SIZE}
                  max={MAX_SIZE}
                  step={16}
                  value={size}
                  aria-label="Size in pixels"
                  onChange={(event) => setSizeInput(event.target.value)}
                />
                {sizeClamped && (
                  <p className="field-note">
                    Clamped to {size}px. The API accepts {MIN_SIZE}–{MAX_SIZE}.
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={bgOn}
                  onChange={(event) => setBgOn(event.target.checked)}
                />
                <span>Override background</span>
              </label>
              {bgOn && (
                <div className="bg-row">
                  <input
                    className="color-input"
                    type="color"
                    value={colorValue}
                    aria-label="Background color"
                    onChange={(event) => setBg(event.target.value.replace('#', ''))}
                  />
                  <input
                    value={bg}
                    onChange={(event) => setBg(event.target.value)}
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="Background hex"
                    aria-invalid={!bgValid}
                  />
                  <span className="field-suffix">hex</span>
                </div>
              )}
              {!bgValid && <p className="field-note is-error">Use a 6-digit hex color.</p>}
            </div>
          </div>
        </section>

        <section className="output-card" aria-label="Generated snippets">
          <div className="output-row">
            <div className="output-label">
              <span>Image URL</span>
              <button
                type="button"
                className="copy-button"
                onClick={() => copy(absoluteUrl, 'url')}
                disabled={!valid || !bgValid}
              >
                {copied === 'url' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <code>{absoluteUrl}</code>
          </div>

          <div className="output-row">
            <div className="output-label">
              <span>HTML</span>
              <button
                type="button"
                className="copy-button"
                onClick={() => copy(html, 'html')}
                disabled={!valid || !bgValid}
              >
                {copied === 'html' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <code>{html}</code>
          </div>
        </section>

        <section className="params">
          <h2>Parameters</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Values</th>
                  <th scope="col">Default</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>format</code>
                  </td>
                  <td>
                    <code>svg</code>, <code>png</code>, <code>jpg</code>
                  </td>
                  <td>
                    <code>svg</code>
                  </td>
                  <td>
                    <code>jpeg</code> also works.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>size</code>
                  </td>
                  <td>
                    <code>64</code>–<code>2048</code>
                  </td>
                  <td>
                    <code>1024</code>
                  </td>
                  <td>Square output in pixels.</td>
                </tr>
                <tr>
                  <td>
                    <code>background</code>
                  </td>
                  <td>6-digit hex, with or without #</td>
                  <td>face background</td>
                  <td>Optional solid background override.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="notes">
          <h2>Good to know</h2>
          <ul>
            <li>
              Responses are cached for an hour with a day of stale-while-revalidate, and
              CORS is open, so the URLs work directly in <code>&lt;img&gt;</code> tags.
            </li>
            <li>Unknown face codes return <code>404</code>; malformed sizes are clamped.</li>
            <li>
              Get a code by opening a portrait in the app and reading the{' '}
              <code>face</code> query parameter.
            </li>
            <li>
              SVG is the lightest option and scales cleanly. PNG and JPG are rasterized
              server-side.
            </li>
          </ul>
        </section>
      </main>

      <footer className="docs-footer">
        <span>
          <BrandMark size={20} /> Naija Faces
        </span>
        <a href="/">Make a face</a>
      </footer>
    </div>
  )
}
