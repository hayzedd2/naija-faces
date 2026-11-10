import { BROW_Y, EYE_LEFT_X, EYE_RIGHT_X } from '../geometry'
import { mix, shade } from '../color'

const BROW_PATHS = [
  'M-35 3 C-22 -1 -10 -2 2 -1 C15 0 27 3 35 8 L33 17 C24 12 12 10 1 9 C-11 8 -23 11 -35 15 Z',
  'M-35 5 C-20 2 -8 1 2 1 C14 1 26 3 35 6 L34 14 C24 11 12 10 1 10 C-10 10 -23 12 -35 14 Z',
  'M-34 10 C-25 2 -14 -3 0 -3 C14 -3 26 1 34 7 L33 14 C25 9 14 6 1 6 C-12 6 -24 10 -33 18 Z',
  'M-34 7 C-22 3 -10 1 2 2 C14 3 25 6 33 10 L32 14 C23 11 12 9 1 9 C-11 9 -23 11 -34 13 Z',
  'M-36 1 C-23 -3 -10 -4 2 -3 C16 -2 28 1 36 6 L34 19 C25 14 12 11 1 10 C-11 9 -24 12 -36 17 Z',
  'M-33 7 C-20 4 -8 3 2 4 C14 5 25 7 33 10 L32 12 C23 10 12 9 1 9 C-11 9 -23 10 -33 11 Z',
]

type Props = {
  value: number
  hairColor: string
}

export function Brows({ value, hairColor }: Props) {
  const color = mix(shade(hairColor, -0.18), '#241811', 0.16)
  const path = BROW_PATHS[value] ?? BROW_PATHS[0]
  return (
    <g fill={color}>
      <g transform={`translate(${EYE_LEFT_X} ${BROW_Y})`}>
        <path d={path} />
        {value === 4 && (
          <g stroke={shade(hairColor, 0.18)} strokeWidth="1.2" strokeLinecap="round" opacity=".45">
            <path d="M-26 8 L-14 6" />
            <path d="M-8 6 L6 6" />
            <path d="M14 7 L26 10" />
          </g>
        )}
      </g>
      <g transform={`translate(${EYE_RIGHT_X} ${BROW_Y}) scale(-1 1)`}>
        <path d={path} />
        {value === 4 && (
          <g stroke={shade(hairColor, 0.18)} strokeWidth="1.2" strokeLinecap="round" opacity=".45">
            <path d="M-26 8 L-14 6" />
            <path d="M-8 6 L6 6" />
            <path d="M14 7 L26 10" />
          </g>
        )}
      </g>
    </g>
  )
}
