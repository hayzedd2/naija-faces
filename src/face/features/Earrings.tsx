type Props = {
  value: number
}

const GOLD = '#d6a84a'
const GOLD_LIGHT = '#f0d28a'
const CORAL = '#e2725b'
const CORAL_DARK = '#b84f3f'
const CORAL_LIGHT = '#f5a48b'
const CREAM = '#f2e8d8'
const SHELL_DARK = '#a8865f'

export function Earrings({ value }: Props) {
  if (value === 0) return null

  const earX = [146, 366]

  if (value === 1) {
    return (
      <g fill="none" stroke={GOLD} strokeWidth="3.2">
        {earX.map((x) => (
          <g key={x}>
            <circle cx={x} cy="282" r="12" />
            <path d={`M${x} 270 L${x} 274`} strokeLinecap="round" />
          </g>
        ))}
      </g>
    )
  }

  if (value === 2) {
    return (
      <g fill={GOLD}>
        {earX.map((x) => (
          <g key={x}>
            <circle cx={x} cy="274" r="4.6" />
            <circle cx={x - 1.4} cy="272.4" r="1.5" fill={GOLD_LIGHT} />
          </g>
        ))}
      </g>
    )
  }

  if (value === 4) {
    return (
      <g>
        {earX.map((x) => (
          <g key={x}>
            <path d={`M${x} 268 L${x} 276`} stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            <circle cx={x} cy="278" r="3" fill={GOLD} />
            <path d={`M${x} 281 L${x} 300`} stroke={CORAL_DARK} strokeWidth="1.4" />
            <circle cx={x} cy="286" r="4.2" fill={CORAL} stroke={CORAL_DARK} strokeWidth=".8" />
            <circle cx={x} cy="295" r="5" fill={CORAL} stroke={CORAL_DARK} strokeWidth=".8" />
            <circle cx={x - 1.4} cy="284.5" r="1.2" fill={CORAL_LIGHT} opacity=".85" />
            <circle cx={x - 1.6} cy="293.4" r="1.4" fill={CORAL_LIGHT} opacity=".85" />
          </g>
        ))}
      </g>
    )
  }

  if (value === 5) {
    return (
      <g>
        {earX.map((x) => (
          <g key={x}>
            <path d={`M${x} 268 L${x} 278`} stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            <circle cx={x} cy="281" r="5.5" fill="none" stroke={GOLD} strokeWidth="2" />
            <path
              d={`M${x - 6} 286 C${x - 8} 296 ${x - 6} 304 ${x - 2} 308`}
              stroke={GOLD}
              strokeWidth="1.6"
              fill="none"
            />
            <path
              d={`M${x + 6} 286 C${x + 8} 296 ${x + 6} 304 ${x + 2} 308`}
              stroke={GOLD}
              strokeWidth="1.6"
              fill="none"
            />
            <circle cx={x - 2} cy="310" r="2.6" fill={GOLD_LIGHT} stroke={GOLD} strokeWidth=".7" />
            <circle cx={x + 2} cy="310" r="2.6" fill={GOLD_LIGHT} stroke={GOLD} strokeWidth=".7" />
            <circle cx={x} cy="303" r="2.2" fill={GOLD} />
          </g>
        ))}
      </g>
    )
  }

  if (value === 6) {
    return (
      <g>
        {earX.map((x) => (
          <g key={x}>
            <path d={`M${x} 268 L${x} 278`} stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            <circle cx={x} cy="280" r="2.8" fill={GOLD} />
            <g transform={`translate(${x} 291)`}>
              <ellipse cx="0" cy="0" rx="5.4" ry="7.4" fill={CREAM} stroke={SHELL_DARK} strokeWidth="1" />
              <path
                d="M0 -4.4 C-1.8 -1.2 -1.8 1.2 0 4.4 C1.8 1.2 1.8 -1.2 0 -4.4 Z"
                fill={SHELL_DARK}
                opacity=".55"
              />
            </g>
          </g>
        ))}
      </g>
    )
  }

  return (
    <g>
      {earX.map((x) => (
        <g key={x}>
          <path
            d={`M${x} 268 L${x} 281`}
            stroke={GOLD}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx={x} cy="287" r="6" fill={GOLD} />
          <circle cx={x - 1.8} cy="285" r="1.8" fill={GOLD_LIGHT} />
        </g>
      ))}
    </g>
  )
}
