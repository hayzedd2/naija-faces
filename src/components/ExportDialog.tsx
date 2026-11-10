import { useEffect, useRef, useState } from 'react'
import {
  buildExportSvg,
  copyBlobToClipboard,
  downloadBlob,
  exportBlob,
  previewUrl,
  type ExportFormat,
  type ExportSize,
  type ExportVariant,
} from '../export'
import { ChevronDownIcon, CloseIcon, CopyIcon, DownloadIcon, LinkIcon } from './icons'

type Props = {
  open: boolean
  code: string
  background: string
  onClose: () => void
  onToast: (message: string) => void
  onCopyLink: () => void
}

const FORMATS: { value: ExportFormat; label: string }[] = [
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG' },
  { value: 'svg', label: 'SVG' },
]

const SIZES: { value: ExportSize; label: string }[] = [
  { value: 1024, label: '1024 px' },
  { value: 2048, label: '2048 px' },
]

const CARDS: { variant: ExportVariant; title: string }[] = [
  { variant: 'branded', title: 'Branded' },
  { variant: 'portrait', title: 'Portrait only' },
]

export function ExportDialog({ open, code, background, onClose, onToast, onCopyLink }: Props) {
  const [format, setFormat] = useState<ExportFormat>('png')
  const [size, setSize] = useState<ExportSize>(1024)
  const [previews, setPreviews] = useState<Partial<Record<ExportVariant, string>>>({})
  const [busy, setBusy] = useState<string | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => {
      const next: Partial<Record<ExportVariant, string>> = {}
      for (const card of CARDS) {
        const svg = buildExportSvg(card.variant, 1024, background)
        if (svg) next[card.variant] = previewUrl(svg)
      }
      setPreviews(next)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open, code, background])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const run = async (key: string, task: () => Promise<void>, errorMessage: string) => {
    if (busy) return
    setBusy(key)
    try {
      await task()
    } catch {
      onToast(errorMessage)
    } finally {
      setBusy(null)
    }
  }

  const handleDownload = (variant: ExportVariant) =>
    run(
      `${variant}-download`,
      async () => {
        const result = await exportBlob(variant, format, size, background)
        if (!result) throw new Error('Missing portrait')
        downloadBlob(result.blob, `naija-faces-${code}-${variant}.${result.extension}`)
        onToast(`${variant === 'branded' ? 'Branded' : 'Portrait'} saved as ${format.toUpperCase()}`)
      },
      'Could not save that export',
    )

  const handleCopyImage = (variant: ExportVariant) =>
    run(
      `${variant}-image`,
      async () => {
        const result = await exportBlob(variant, 'png', size, background)
        if (!result) throw new Error('Missing portrait')
        await copyBlobToClipboard(result.blob)
        onToast('Image copied — paste it anywhere')
      },
      'Image copy is not available in this browser',
    )

  const handleCopySvg = (variant: ExportVariant) =>
    run(
      `${variant}-svg`,
      async () => {
        const svg = buildExportSvg(variant, size, background)
        if (!svg) throw new Error('Missing portrait')
        await navigator.clipboard.writeText(svg)
        onToast('SVG code copied')
      },
      'Could not copy the SVG code',
    )

  return (
    <div
      className="export-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="export-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-title"
      >
        <div className="export-head">
          <div>
            <p className="eyebrow">Save &amp; share</p>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close export panel"
            onClick={onClose}
            ref={closeRef}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="export-controls">
          <label className="export-field">
            <span className="export-label">Format</span>
            <span className="select-wrap">
              <select
                className="export-select"
                value={format}
                onChange={(event) => setFormat(event.target.value as ExportFormat)}
                aria-label="File format"
              >
                {FORMATS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="select-chevron" />
            </span>
          </label>

          <label className="export-field">
            <span className="export-label">Size</span>
            <span className="select-wrap">
              <select
                className="export-select"
                value={size}
                onChange={(event) => setSize(Number(event.target.value) as ExportSize)}
                aria-label="Export size"
              >
                {SIZES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="select-chevron" />
            </span>
          </label>

          <button type="button" className="export-copy-link" onClick={onCopyLink}>
            <LinkIcon size={15} />
            Copy link
          </button>
        </div>

        <div className="export-grid">
          {CARDS.map((card) => (
            <article className="export-card" key={card.variant}>
              <div className="export-preview">
                {previews[card.variant] ? (
                  <img src={previews[card.variant]} alt={`${card.title} export preview`} />
                ) : (
                  <span className="export-loading" aria-hidden="true" />
                )}
              </div>

              <div className="export-meta">
                <h3>{card.title}</h3>
              </div>

              <button
                type="button"
                className="btn btn-dark export-download"
                onClick={() => handleDownload(card.variant)}
                disabled={busy !== null}
              >
                <DownloadIcon size={16} />
                {busy === `${card.variant}-download` ? 'Preparing…' : 'Download'}
              </button>

              <div className="export-copy-row">
                <button
                  type="button"
                  className="export-text-btn"
                  onClick={() => handleCopyImage(card.variant)}
                  disabled={busy !== null}
                >
                  <CopyIcon />
                  Copy image
                </button>
                <button
                  type="button"
                  className="export-text-btn"
                  onClick={() => handleCopySvg(card.variant)}
                  disabled={busy !== null}
                >
                  <CopyIcon />
                  Copy SVG
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
