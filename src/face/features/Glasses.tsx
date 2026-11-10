import { EYE_LEFT_X, EYE_RIGHT_X } from '../geometry'

type Props = {
  value: number
}

export function Glasses({ value }: Props) {
  if (value === 0) return null

  const frame = '#2b2320'

  if (value === 1) {
    return (
      <g fill="none" stroke={frame} strokeWidth="3.6" strokeLinecap="round">
        <circle cx={EYE_LEFT_X} cy="238" r="32" fill="rgba(220,235,245,.16)" />
        <circle cx={EYE_RIGHT_X} cy="238" r="32" fill="rgba(220,235,245,.16)" />
        <path d="M242 234 C246 229 262 229 266 234" />
        <path d="M178 233 L162 228" />
        <path d="M334 233 L350 228" />
        <path d="M186 224 C192 216 202 212 212 212" stroke="rgba(255,255,255,.45)" strokeWidth="1.6" />
        <path d="M278 224 C284 216 294 212 304 212" stroke="rgba(255,255,255,.45)" strokeWidth="1.6" />
      </g>
    )
  }

  if (value === 2) {
    return (
      <g fill="none" stroke={frame} strokeWidth="3.6" strokeLinecap="round">
        <rect x="174" y="216" width="72" height="44" rx="11" fill="rgba(220,235,245,.14)" />
        <rect x="266" y="216" width="72" height="44" rx="11" fill="rgba(220,235,245,.14)" />
        <path d="M246 230 C250 225 262 225 266 230" />
        <path d="M174 228 L158 224" />
        <path d="M338 228 L354 224" />
        <path d="M182 224 L196 224" stroke="rgba(255,255,255,.4)" strokeWidth="1.6" />
        <path d="M274 224 L288 224" stroke="rgba(255,255,255,.4)" strokeWidth="1.6" />
      </g>
    )
  }

  return (
    <g>
      <rect x="172" y="212" width="76" height="50" rx="14" fill="#241d19" opacity=".92" />
      <rect x="264" y="212" width="76" height="50" rx="14" fill="#241d19" opacity=".92" />
      <g stroke={frame} strokeWidth="3.6" strokeLinecap="round">
        <path d="M248 232 C252 227 260 227 264 232" fill="none" />
        <path d="M172 228 L156 224" fill="none" />
        <path d="M340 228 L356 224" fill="none" />
      </g>
      <g stroke="rgba(255,255,255,.22)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M184 244 L200 224" />
        <path d="M276 244 L292 224" />
      </g>
      <g stroke="rgba(255,255,255,.1)" strokeWidth="1.4" strokeLinecap="round">
        <path d="M190 248 L210 222" />
        <path d="M282 248 L302 222" />
      </g>
    </g>
  )
}
