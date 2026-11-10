type Props = {
  value: number
}

const CORAL = '#e2725b'
const CORAL_DARK = '#b84f3f'
const CORAL_LIGHT = '#f5a48b'
const GOLD = '#d6a84a'
const GOLD_LIGHT = '#f0d28a'
const CREAM = '#f2e8d8'
const SHELL_DARK = '#a8865f'

function arcPoints(y0: number, sag: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    return {
      x: 212 + t * 88,
      y: y0 + Math.sin(Math.PI * t) * sag,
    }
  })
}

export function Necklace({ value }: Props) {
  if (value === 0) return null

  if (value === 1) {
    return (
      <g>
        <path d="M212 412 Q256 448 300 412" stroke={CORAL_DARK} strokeWidth="1.6" fill="none" />
        <path d="M214 424 Q256 464 298 424" stroke={CORAL_DARK} strokeWidth="1.4" fill="none" />
        {[
          ...arcPoints(412, 28, 9),
          ...arcPoints(424, 32, 9),
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5.1" fill={CORAL} stroke={CORAL_DARK} strokeWidth="1" />
            <circle cx={p.x - 1.4} cy={p.y - 1.6} r="1.5" fill={CORAL_LIGHT} opacity=".85" />
          </g>
        ))}
        <g>
          <circle cx="256" cy="450" r="8" fill={CORAL} stroke={CORAL_DARK} strokeWidth="1.2" />
          <circle cx="253" cy="447" r="2.2" fill={CORAL_LIGHT} opacity=".85" />
          <path d="M250 438 L256 433 L262 438" stroke={GOLD} strokeWidth="2" fill="none" />
        </g>
      </g>
    )
  }

  if (value === 2) {
    return (
      <g>
        <path d="M214 414 Q256 448 298 414" stroke={GOLD} strokeWidth="2.4" fill="none" />
        <path d="M214 412 Q256 445 298 412" stroke={GOLD_LIGHT} strokeWidth=".9" fill="none" opacity=".8" />
        {arcPoints(414, 34, 9).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.2" fill={GOLD} stroke="#8a6420" strokeWidth=".7" />
        ))}
        <g transform="translate(256 446)">
          <path d="M0 -8 L7 0 L0 9 L-7 0 Z" fill={GOLD} stroke="#8a6420" strokeWidth="1" />
          <path d="M0 -4 L3 0 L0 4 L-3 0 Z" fill={GOLD_LIGHT} opacity=".8" />
        </g>
      </g>
    )
  }

  if (value === 3) {
    const shells = arcPoints(414, 32, 5)
    return (
      <g>
        <path d="M212 414 Q256 448 300 414" stroke={SHELL_DARK} strokeWidth="1.6" fill="none" />
        {shells.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <ellipse cx="0" cy="0" rx="5" ry="7" fill={CREAM} stroke={SHELL_DARK} strokeWidth="1" />
            <path d="M0 -4 C-1.6 -1 -1.6 1 0 4 C1.6 1 1.6 -1 0 -4 Z" fill={SHELL_DARK} opacity=".55" />
            <path d="M-2.4 -2.4 C-1.6 -1.4 -1.6 -0.6 -1.2 0" stroke={CREAM} strokeWidth=".8" fill="none" opacity=".9" />
          </g>
        ))}
        <circle cx="256" cy="448" r="4" fill={GOLD} stroke="#8a6420" strokeWidth=".8" />
      </g>
    )
  }

  return (
    <g>
      {[412, 424, 436].map((y, row) => {
        const inset = row * 4
        const count = 11 - row
        return Array.from({ length: count }, (_, i) => {
          const x = 208 + inset + (i * (96 - inset * 2)) / (count - 1)
          const yy = y + Math.sin((Math.PI * i) / (count - 1)) * (10 - row * 2)
          const fill = i % 3 === 0 ? GOLD : i % 3 === 1 ? CORAL : CREAM
          return (
            <g key={`${row}-${i}`}>
              <circle cx={x} cy={yy} r="3.3" fill={fill} stroke={row === 2 ? GOLD : CORAL_DARK} strokeWidth=".8" />
              <circle cx={x - 1} cy={yy - 1} r=".9" fill="#ffffff" opacity=".45" />
            </g>
          )
        })
      })}
    </g>
  )
}
