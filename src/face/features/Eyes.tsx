import type { SkinTone } from '../config'
import { EYE_LEFT_X, EYE_RIGHT_X, EYE_Y } from '../geometry'
import { alpha, mix, shade } from '../color'

const SCLERA = [
  'M-24 2 C-19 -4 -9 -9 2 -9 C13 -9 21 -4 25 1 C20 6 11 9 1 9 C-10 9 -18 6 -24 2 Z',
  'M-23 0 C-23 -12 -11 -16 1 -16 C13 -16 23 -12 24 0 C23 11 13 16 1 16 C-11 16 -23 11 -23 0 Z',
  'M-24 2 C-19 -4 -9 -9 2 -9 C13 -9 21 -4 25 1 C20 6 11 9 1 9 C-10 9 -18 6 -24 2 Z',
  'M-25 1 C-20 -8 -10 -13 2 -13 C14 -13 23 -8 26 0 C21 8 11 13 1 13 C-10 13 -19 8 -25 1 Z',
  'M-24 1 C-19 -5 -8 -8 2 -8 C13 -8 22 -4 25 1 C20 6 10 8 0 8 C-10 8 -18 6 -24 1 Z',
  'M26 4 C14 -6 -2 -12 -14 -9 C-21 -7 -25 -3 -27 -5 C-25 3 -18 11 -8 13 C2 15 16 12 26 4 Z',
]

const UPPER = [
  'M-24 2 C-19 -4 -9 -9 2 -9 C13 -9 21 -4 25 1',
  'M-23 0 C-23 -12 -11 -16 1 -16 C13 -16 23 -12 24 0',
  'M-24 2 C-19 -4 -9 -9 2 -9 C13 -9 21 -4 25 1',
  'M-25 1 C-20 -8 -10 -13 2 -13 C14 -13 23 -8 26 0',
  'M-24 1 C-19 -5 -8 -8 2 -8 C13 -8 22 -4 25 1',
  'M26 4 C14 -6 -2 -12 -14 -9 C-21 -7 -25 -3 -27 -5',
]

const LOWER = [
  'M-23 5 C-16 9 -6 11 2 11 C12 11 20 8 25 3',
  'M-22 5 C-16 13 -6 16 1 16 C12 16 22 12 23 4',
  'M-23 5 C-16 9 -6 11 2 11 C12 11 20 8 25 3',
  'M-24 4 C-17 11 -7 15 2 15 C13 15 22 10 26 4',
  'M-23 3 C-16 7 -6 9 1 9 C12 9 21 6 24 2',
  'M25 4 C14 12 1 15 -9 13 C-17 11 -23 6 -27 -4',
]

const CREASE = [
  'M-22 -3 C-14 -11 -2 -14 8 -13 C16 -12 22 -8 26 -2',
  'M-21 -8 C-13 -17 -1 -20 9 -19 C18 -18 24 -13 27 -6',
  'M-23 -1 C-15 -9 -3 -12 7 -11 C16 -10 22 -6 26 0',
  'M-23 -6 C-15 -15 -3 -18 8 -17 C18 -16 24 -11 28 -4',
  'M-22 -3 C-14 -11 -2 -14 8 -13 C16 -12 22 -8 26 -2',
  'M-23 -8 C-15 -17 -3 -20 7 -19 C16 -18 23 -13 27 -6',
]

const IRIS_R = [10.8, 12.5, 10.8, 11.8, 10.2, 10.6]

type EyeProps = {
  value: number
  color: string
  skin: SkinTone
  id: string
  side: 'l' | 'r'
  cx: number
}

function Eye({ value, color, skin, id, side, cx }: EyeProps) {
  const sclera = SCLERA[value] ?? SCLERA[0]
  const upper = UPPER[value] ?? UPPER[0]
  const lower = LOWER[value] ?? LOWER[0]
  const crease = CREASE[value] ?? CREASE[0]
  const r = IRIS_R[value] ?? IRIS_R[0]
  const lash = mix(shade(color, -0.45), '#1d120c', 0.5)
  const irisDark = shade(color, -0.35)
  const irisLight = mix(color, '#ffffff', 0.2)
  const clipId = `eye-clip-${id}-${side}`
  const transform =
    side === 'l'
      ? `translate(${cx} ${EYE_Y})`
      : `translate(${cx} ${EYE_Y}) scale(-1 1)`

  return (
    <g transform={transform}>
      <defs>
        <clipPath id={clipId}>
          <path d={sclera} />
        </clipPath>
        <radialGradient id={`iris-${id}-${side}`} cx=".42" cy=".38" r=".7">
          <stop offset="0" stopColor={irisLight} />
          <stop offset=".62" stopColor={color} />
          <stop offset="1" stopColor={irisDark} />
        </radialGradient>
      </defs>
      <path d={sclera} fill="#f8f3ea" />
      <g clipPath={`url(#${clipId})`}>
        <circle cx="0.5" cy="0.5" r={r} fill={`url(#iris-${id}-${side})`} />
        <circle cx="0.5" cy="0.5" r={r} fill="none" stroke={alpha(irisDark, 0.7)} strokeWidth="1.4" />
        <circle cx="0.5" cy="0.5" r={r * 0.46} fill="#17100c" />
        <circle cx="-3.2" cy="-3.4" r="2.3" fill="#fffdf8" opacity=".92" />
        <circle cx="3.4" cy="3.4" r="1.15" fill="#fffdf8" opacity=".45" />
        <path d={upper} fill="none" stroke={alpha(skin.shadow, 0.45)} strokeWidth="4" />
        {value === 2 && (
          <path
            d="M-24 2 C-19 -4 -9 -9 2 -9 C13 -9 21 -4 25 1 L25 2 C13 0 2 -1 -5 1 C-13 3 -19 5 -24 6 Z"
            fill={skin.base}
          />
        )}
      </g>
      <path
        d={upper}
        fill="none"
        stroke={lash}
        strokeWidth={value === 2 ? 3.8 : 3.2}
        strokeLinecap="round"
      />
      <path
        d={lower}
        fill="none"
        stroke={lash}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity=".28"
      />
      <path
        d={crease}
        fill="none"
        stroke={lash}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".16"
      />
    </g>
  )
}

type Props = {
  value: number
  color: string
  skin: SkinTone
  id: string
}

export function Eyes({ value, color, skin, id }: Props) {
  return (
    <g>
      <Eye value={value} color={color} skin={skin} id={id} side="l" cx={EYE_LEFT_X} />
      <Eye value={value} color={color} skin={skin} id={id} side="r" cx={EYE_RIGHT_X} />
    </g>
  )
}
