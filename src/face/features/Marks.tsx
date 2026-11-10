import type { SkinTone } from '../config'
import { alpha, shade } from '../color'

type Props = {
  value: number
  skin: SkinTone
}

export function Marks({ value, skin }: Props) {
  if (value === 0) return null

  const ink = alpha(shade(skin.shadow, -0.3), 0.62)
  const lift = alpha(skin.light, 0.45)

  if (value === 1) {
    return (
      <g fill="none" strokeLinecap="round">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path
              d={`M186 ${282 + i * 10} C198 ${278 + i * 10} 210 ${278 + i * 10} 222 ${282 + i * 10}`}
              stroke={ink}
              strokeWidth="2.4"
            />
            <path
              d={`M186 ${280 + i * 10} C198 ${276 + i * 10} 210 ${276 + i * 10} 222 ${280 + i * 10}`}
              stroke={lift}
              strokeWidth=".9"
            />
            <path
              d={`M290 ${282 + i * 10} C302 ${278 + i * 10} 314 ${278 + i * 10} 326 ${282 + i * 10}`}
              stroke={ink}
              strokeWidth="2.4"
            />
            <path
              d={`M290 ${280 + i * 10} C302 ${276 + i * 10} 314 ${276 + i * 10} 326 ${280 + i * 10}`}
              stroke={lift}
              strokeWidth=".9"
            />
          </g>
        ))}
      </g>
    )
  }

  if (value === 2) {
    return (
      <g fill="none" strokeLinecap="round">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path
              d={`M196 ${272 + i * 9} C186 ${306 + i * 8} 186 ${340 + i * 6} 196 ${364 + i * 4}`}
              stroke={ink}
              strokeWidth="2.6"
            />
            <path
              d={`M194 ${272 + i * 9} C184 ${306 + i * 8} 184 ${340 + i * 6} 194 ${364 + i * 4}`}
              stroke={lift}
              strokeWidth=".9"
            />
            <path
              d={`M316 ${272 + i * 9} C326 ${306 + i * 8} 326 ${340 + i * 6} 316 ${364 + i * 4}`}
              stroke={ink}
              strokeWidth="2.6"
            />
            <path
              d={`M318 ${272 + i * 9} C328 ${306 + i * 8} 328 ${340 + i * 6} 318 ${364 + i * 4}`}
              stroke={lift}
              strokeWidth=".9"
            />
          </g>
        ))}
      </g>
    )
  }

  return (
    <g fill="none" strokeLinecap="round">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M198 ${274 + i * 9} L198 ${322 + i * 7}`} stroke={ink} strokeWidth="2.4" />
          <path d={`M196 ${274 + i * 9} L196 ${322 + i * 7}`} stroke={lift} strokeWidth=".9" />
          <path d={`M314 ${274 + i * 9} L314 ${322 + i * 7}`} stroke={ink} strokeWidth="2.4" />
          <path d={`M316 ${274 + i * 9} L316 ${322 + i * 7}`} stroke={lift} strokeWidth=".9" />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <path
          key={`f${i}`}
          d={`M234 ${170 + i * 8} L278 ${170 + i * 8}`}
          stroke={ink}
          strokeWidth="2"
        />
      ))}
    </g>
  )
}
