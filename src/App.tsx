import { useCallback, useEffect, useState } from 'react'
import { TraitPicker } from './components/TraitPicker'
import { ExportDialog } from './components/ExportDialog'
import {
  BrandMark,
  CheckIcon,
  DownloadIcon,
  LinkIcon,
  ResetIcon,
  ShuffleIcon,
} from './components/icons'
import {
  BACKGROUNDS,
  COMBINATION_COUNT,
  DEFAULT_TRAITS,
  PICKER_TABS,
  type CategoryKey,
  type PickerKey,
  type Traits,
} from './face/config'
import { Face } from './face/Face'
import { decodeTraits, encodeTraits, faceUrl, traitsFromLocation } from './face/codec'
import { randomTraitValue, randomTraits } from './face/random'

const STORAGE_KEY = 'naija-faces'
const LEGACY_STORAGE_KEY = 'face-studio'

function initialTraits(): Traits {
  const fromUrl = traitsFromLocation()
  if (fromUrl) return fromUrl
  try {
    const saved =
      decodeTraits(window.localStorage.getItem(STORAGE_KEY)) ??
      decodeTraits(window.localStorage.getItem(LEGACY_STORAGE_KEY))
    if (saved) return saved
  } catch {
    // Storage can be unavailable in private modes.
  }
  return DEFAULT_TRAITS
}

function formatCount(count: number): string {
  if (count >= 1_000_000_000_000) return `${(count / 1_000_000_000_000).toFixed(1)} trillion`
  if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1)} billion`
  if (count >= 1_000_000) return `${Math.round(count / 1_000_000)} million`
  return count.toLocaleString()
}

type Toast = { id: number; message: string }

export default function App() {
  const [traits, setTraits] = useState<Traits>(initialTraits)
  const [active, setActive] = useState<PickerKey>('headwear')
  const [toast, setToast] = useState<Toast | null>(null)
  const [exportOpen, setExportOpen] = useState(false)

  const code = encodeTraits(traits)
  const bg = (BACKGROUNDS[traits.bg] ?? BACKGROUNDS[0]).value

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message })
  }, [])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('face', code)
    window.history.replaceState(null, '', url)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Ignore storage failures.
    }
  }, [code])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const shuffle = useCallback(() => {
    setTraits(randomTraits())
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      if (event.key.toLowerCase() === 'r') {
        event.preventDefault()
        shuffle()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [shuffle])

  const select = (key: CategoryKey, index: number) => {
    setTraits((current) => ({ ...current, [key]: index }))
  }

  const randomizeCategory = (key: PickerKey) => {
    if (key === 'jewelry') {
      setTraits((current) => ({
        ...current,
        necklace: randomTraitValue('necklace'),
        earrings: randomTraitValue('earrings'),
      }))
      return
    }
    if (key === 'headwear') {
      setTraits((current) => ({
        ...current,
        headwear: randomTraitValue('headwear'),
        fabric: randomTraitValue('fabric'),
      }))
      return
    }
    setTraits((current) => ({ ...current, [key]: randomTraitValue(key) }))
  }

  const reset = () => {
    setTraits(DEFAULT_TRAITS)
    showToast('Back to the original face')
  }

  const copyLink = async () => {
    const url = faceUrl(traits)
    try {
      await navigator.clipboard.writeText(url)
      showToast('Link copied — share your face')
    } catch {
      window.prompt('Copy your portrait link', url)
    }
  }

  const openExport = () => {
    setExportOpen(true)
  }

  return (
    <div className="app">
      <header className="site-header">
        <a
          className="brand"
          href="/"
          onClick={(event) => {
            event.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <BrandMark />
          <span className="brand-text">
            <span className="brand-name">Naija Faces</span>
            <span className="brand-tag">Naija style, made by you</span>
          </span>
        </a>

        <div className="header-actions">
          <button type="button" className="btn btn-dark" onClick={shuffle}>
            <ShuffleIcon />
            <span className="btn-label">Shuffle</span>
            <kbd>R</kbd>
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={openExport}
            aria-haspopup="dialog"
          >
            <DownloadIcon />
            <span className="btn-label">Save</span>
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={copyLink}
            aria-label="Copy link to this face"
          >
            <LinkIcon />
            <span className="btn-label">Share</span>
          </button>
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">The Naija avatar studio</p>
            <h1>
              Make a face<span className="accent">.</span>
            </h1>
          </div>
          <p className="hero-lede">
            Pick your hair, add a gele or fila, throw on some beads. Make a face that looks like you, or just have fun.
          </p>
        </section>

        <div className="studio">
          <section className="stage" aria-label="Portrait preview">
            <div className="stage-inner">
              <div className="portrait-card">
                <div className="portrait-frame" style={{ backgroundColor: bg }}>
                  <Face key={code} traits={traits} svgId="portrait-svg" className="portrait-face" />
                </div>
                <div className="portrait-bar">
                  <span className="portrait-id">
                    <span className="id-dot" style={{ backgroundColor: bg }} />
                    Portrait {code.slice(1, 5).toUpperCase()}
                  </span>
                  <button type="button" className="text-btn" onClick={reset}>
                    <ResetIcon />
                    Reset
                  </button>
                </div>
              </div>
              <p className="stage-caption">
                One of <strong>{formatCount(COMBINATION_COUNT)}</strong> possible faces. Press{' '}
                <kbd>R</kbd> to shuffle.
              </p>
            </div>
          </section>

          <section className="builder" aria-label="Face builder">
            <div className="builder-head">
              <div>
                <p className="eyebrow">Customize</p>
                <h2>Build your face</h2>
              </div>
              <p className="builder-note">Tap any option to try it on.</p>
            </div>
            <TraitPicker
              traits={traits}
              active={active}
              onActiveChange={setActive}
              onSelect={select}
              onRandomizeCategory={randomizeCategory}
            />
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <span className="footer-brand">
          <BrandMark size={22} /> Naija Faces
        </span>
        <span>Every feature drawn by hand, in SVG.</span>
        <span>{PICKER_TABS.length} feature groups · no account needed</span>
      </footer>

      {toast && (
        <div className="toast" role="status" key={toast.id}>
          <CheckIcon size={14} />
          {toast.message}
        </div>
      )}

      <ExportDialog
        open={exportOpen}
        code={code}
        background={bg}
        onClose={() => setExportOpen(false)}
        onToast={showToast}
        onCopyLink={copyLink}
      />
    </div>
  )
}
