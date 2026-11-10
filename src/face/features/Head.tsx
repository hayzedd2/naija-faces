import type { SkinTone } from '../config'
import { facePath } from '../geometry'

type Props = {
  shape: number
  skin: SkinTone
  id: string
}

export function Head({ shape, skin, id }: Props) {
  const path = facePath(shape)

  return (
    <g>
      <defs>
        <clipPath id={`head-${id}`}>
          <path d={path} />
        </clipPath>
        <linearGradient id={`side-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={skin.shadow} stopOpacity="0" />
          <stop offset=".42" stopColor={skin.shadow} stopOpacity="0" />
          <stop offset="1" stopColor={skin.shadow} stopOpacity=".85" />
        </linearGradient>
        <filter id={`blur-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <Neck skin={skin} id={id} />
      <Ears skin={skin} />

      <path d={path} fill={skin.base} />
      <g clipPath={`url(#head-${id})`}>
        <rect x="286" y="0" width="230" height="512" fill={`url(#side-${id})`} opacity=".22" />
        <ellipse cx="224" cy="168" rx="62" ry="40" fill="#fff" opacity=".045" />
        <ellipse
          cx="256"
          cy="378"
          rx="88"
          ry="30"
          fill={skin.shadow}
          opacity=".14"
          filter={`url(#blur-${id})`}
        />
        <ellipse
          cx="196"
          cy="278"
          rx="34"
          ry="22"
          fill={skin.shadow}
          opacity=".07"
          filter={`url(#blur-${id})`}
        />
        <ellipse
          cx="318"
          cy="278"
          rx="34"
          ry="22"
          fill={skin.shadow}
          opacity=".1"
          filter={`url(#blur-${id})`}
        />
      </g>
    </g>
  )
}

function Neck({ skin, id }: { skin: SkinTone; id: string }) {
  return (
    <g>
      <path
        d="M220 300 C220 340 214 366 208 386 L198 512 L314 512 L304 386 C298 366 292 340 292 300 Z"
        fill={skin.base}
      />
      <path
        d="M220 300 C220 340 214 366 208 386 L198 512 L218 512 L226 386 C232 366 238 340 238 300 Z"
        fill={skin.shadow}
        opacity=".22"
      />
      <ellipse
        cx="256"
        cy="402"
        rx="50"
        ry="20"
        fill={skin.shadow}
        opacity=".52"
        filter={`url(#blur-${id})`}
      />
      <ellipse cx="256" cy="452" rx="34" ry="30" fill={skin.light} opacity=".06" />
    </g>
  )
}

function Ears({ skin }: { skin: SkinTone }) {
  return (
    <g>
      <g>
        <path
          d="M164 202 C150 194 136 202 133 220 C130 240 135 262 145 275 C151 283 162 283 165 274 L165 210 C165 206 165 204 164 202 Z"
          fill={skin.base}
        />
        <path
          d="M157 218 C149 214 141 220 141 233 C141 247 145 260 152 268 C155 272 158 270 158 265 L158 224 Z"
          fill={skin.shadow}
          opacity=".62"
        />
        <path
          d="M157 238 C153 240 152 245 154 249"
          stroke={skin.shadow}
          strokeWidth="2"
          fill="none"
          opacity=".55"
          strokeLinecap="round"
        />
        <path
          d="M138 220 C137 234 141 250 148 263"
          stroke={skin.light}
          strokeWidth="2"
          fill="none"
          opacity=".55"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(512 0) scale(-1 1)">
        <path
          d="M164 202 C150 194 136 202 133 220 C130 240 135 262 145 275 C151 283 162 283 165 274 L165 210 C165 206 165 204 164 202 Z"
          fill={skin.base}
        />
        <path
          d="M157 218 C149 214 141 220 141 233 C141 247 145 260 152 268 C155 272 158 270 158 265 L158 224 Z"
          fill={skin.shadow}
          opacity=".62"
        />
        <path
          d="M157 238 C153 240 152 245 154 249"
          stroke={skin.shadow}
          strokeWidth="2"
          fill="none"
          opacity=".55"
          strokeLinecap="round"
        />
        <path
          d="M138 220 C137 234 141 250 148 263"
          stroke={skin.light}
          strokeWidth="2"
          fill="none"
          opacity=".55"
          strokeLinecap="round"
        />
      </g>
    </g>
  )
}
