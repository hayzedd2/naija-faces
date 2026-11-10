import type { ReactNode } from 'react'
import type { SkinTone } from '../config'
import { alpha, shade } from '../color'

type HairProps = {
  value: number
  color: string
  skin: SkinTone
  id: string
}

const CAP_FADE =
  'M256 56 C318 56 358 84 362 134 C363 148 362 164 359 180 C354 168 349 158 343 152 C337 146 328 142 318 138 C302 130 282 125 256 124 C230 125 210 130 194 138 C184 142 175 146 169 152 C163 158 158 168 153 180 C150 164 149 148 150 134 C154 84 194 56 256 56 Z'

const CAP_BUZZ =
  'M256 58 C314 58 352 84 357 132 C359 148 358 162 355 172 C349 162 344 155 338 150 C330 144 320 141 308 140 C292 136 276 134 256 134 C236 134 220 136 204 140 C192 141 182 144 174 150 C168 155 163 162 157 172 C154 162 153 148 155 132 C160 84 198 58 256 58 Z'

const AFRO_FRONT =
  'M256 60 C314 60 350 86 355 134 C356 144 355 152 353 158 C346 146 338 138 328 134 C312 128 286 126 256 126 C226 126 200 128 184 134 C174 138 166 146 159 158 C157 152 156 144 157 134 C162 86 198 60 256 60 Z'

const AFRO_BACK =
  'M256 26 C268 18 282 22 290 32 C304 24 320 28 328 42 C344 42 356 54 358 68 C372 76 378 92 372 106 C384 118 384 136 374 148 C382 162 376 180 362 188 C360 202 348 212 334 212 L178 212 C164 212 152 202 150 188 C136 180 130 162 138 148 C128 136 128 118 140 106 C134 92 140 76 154 68 C156 54 168 42 184 42 C192 28 208 24 222 32 C230 22 244 18 256 26 Z'

const CURLS_BASE =
  'M256 62 C310 62 348 88 354 136 C355 148 354 160 351 170 C346 160 340 152 333 147 C324 141 312 138 300 137 C286 134 272 133 256 133 C240 133 226 134 212 137 C200 138 188 141 179 147 C172 152 166 160 161 170 C158 160 157 148 158 136 C164 88 202 62 256 62 Z'

const LONG_BACK =
  'M256 48 C332 48 382 100 386 180 L388 402 C388 430 370 446 344 446 L168 446 C142 446 124 430 124 402 L126 180 C130 100 180 48 256 48 Z'

const LONG_TOP_LEFT =
  'M256 58 C220 58 190 72 174 96 C160 118 152 150 150 184 L150 212 C164 198 176 178 184 156 C192 134 206 114 226 98 C236 90 248 76 256 58 Z'

const LONG_CURTAIN_LEFT =
  'M150 170 C146 210 145 260 147 300 C148 318 158 328 170 326 C182 324 188 312 190 296 C193 264 190 238 184 214 C180 196 182 180 188 166 C194 152 202 142 212 134 C196 142 182 154 172 168 C164 180 156 186 150 184 Z'

const BOB_BACK =
  'M256 50 C330 50 380 100 384 176 L386 326 C386 352 370 368 344 368 L168 368 C142 368 126 352 126 326 L128 176 C132 100 182 50 256 50 Z'

const BOB_BANGS =
  'M256 54 C318 54 358 84 362 142 L362 158 C350 172 336 180 318 176 C300 171 280 168 256 168 C232 168 212 171 194 176 C176 180 162 172 150 158 L150 142 C154 84 194 54 256 54 Z'

const BOB_SIDE_LEFT =
  'M150 150 C146 200 145 252 148 296 C149 314 158 324 170 322 C181 320 187 310 188 294 C190 262 188 232 183 206 C180 190 180 174 185 160 C172 168 160 164 150 150 Z'

const POMPADOUR =
  'M256 34 C296 28 326 44 338 70 C348 90 352 114 354 136 C355 150 354 162 351 172 C346 160 340 152 332 147 C318 139 292 134 256 134 C220 134 192 139 178 147 C170 152 164 160 159 172 C156 162 155 150 156 136 C158 112 164 92 174 74 C186 52 216 40 256 34 Z'

const LOC_STRANDS_LEFT = [
  'M230 68 C212 116 202 194 206 300',
  'M216 74 C196 122 184 204 188 322',
  'M204 84 C182 130 170 208 174 346',
  'M190 94 C166 146 154 230 158 374',
  'M176 106 C152 160 140 244 144 402',
  'M162 124 C138 180 128 262 132 422',
  'M150 146 C128 200 120 278 124 438',
  'M140 176 C122 228 116 298 120 448',
  'M132 204 C116 252 112 312 116 454',
] as const

function Loc({ d, color, width = 13 }: { d: string; color: string; width?: number }) {
  return (
    <g>
      <path d={d} stroke={color} strokeWidth={width} strokeLinecap="round" fill="none" />
      <path
        d={d}
        stroke={shade(color, 0.2)}
        strokeWidth={width * 0.26}
        strokeLinecap="round"
        fill="none"
        opacity=".5"
        transform="translate(-1.4 0)"
      />
      <path
        d={d}
        stroke={alpha(shade(color, -0.4), 0.5)}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        transform="translate(2.2 0)"
      />
    </g>
  )
}

export function HairBack({ value, color, id }: HairProps) {
  if (value === 2) {
    return (
      <g>
        <defs>
          <clipPath id={`afro-clip-${id}`}>
            <path d={AFRO_BACK} />
          </clipPath>
          <pattern id={`afro-dots-${id}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2.4" fill={alpha(shade(color, 0.22), 0.5)} />
            <circle cx="13" cy="12" r="2" fill={alpha(shade(color, -0.25), 0.4)} />
          </pattern>
        </defs>
        <path d={AFRO_BACK} fill={color} />
        <g clipPath={`url(#afro-clip-${id})`}>
          <rect x="110" y="10" width="292" height="210" fill={`url(#afro-dots-${id})`} />
          <ellipse cx="210" cy="74" rx="70" ry="42" fill={shade(color, 0.12)} opacity=".35" />
        </g>
      </g>
    )
  }

  if (value === 5) {
    return (
      <g>
        {LOC_STRANDS_LEFT.map((d) => (
          <Loc key={d} d={d} color={color} />
        ))}
        <g transform="translate(512 0) scale(-1 1)">
          {LOC_STRANDS_LEFT.map((d) => (
            <Loc key={d} d={d} color={color} />
          ))}
        </g>
        <g fill="#d6a84a" stroke="#8a6420" strokeWidth=".8">
          <ellipse cx="128" cy="318" rx="7.5" ry="4" transform="rotate(-10 128 318)" />
          <ellipse cx="140" cy="356" rx="7.5" ry="4" transform="rotate(-8 140 356)" />
          <ellipse cx="384" cy="318" rx="7.5" ry="4" transform="rotate(10 384 318)" />
          <ellipse cx="372" cy="356" rx="7.5" ry="4" transform="rotate(8 372 356)" />
        </g>
      </g>
    )
  }

  if (value === 6) {
    return (
      <g>
        <path d={LONG_BACK} fill={color} />
        <path
          d="M256 70 C212 70 176 90 156 126 C142 150 136 180 136 214 L136 398 C136 414 146 424 160 424 L352 424 C366 424 376 414 376 398 L376 214 C376 180 370 150 356 126 C336 90 300 70 256 70 Z"
          fill={alpha(shade(color, -0.18), 0.5)}
        />
      </g>
    )
  }

  if (value === 7) {
    return (
      <g>
        <path d={BOB_BACK} fill={color} />
        <path
          d="M256 66 C204 66 168 88 152 128 C144 150 142 180 144 214 L144 320 C144 334 154 344 168 344 L344 344 C358 344 368 334 368 320 L368 214 C370 180 368 150 360 128 C344 88 308 66 256 66 Z"
          fill={alpha(shade(color, -0.16), 0.45)}
        />
      </g>
    )
  }

  return null
}

const SHINE_PATH =
  'M198 104 C212 82 232 70 256 68 C240 78 224 92 214 110 C206 126 202 138 200 148 C192 136 190 120 198 104 Z'

function HairShine({ id, children }: { id: string; children: ReactNode }) {
  return (
    <g>
      <defs>
        <clipPath id={`shine-${id}`}>{children}</clipPath>
      </defs>
      <path d={SHINE_PATH} fill="#ffffff" opacity=".065" clipPath={`url(#shine-${id})`} />
    </g>
  )
}

export function HairFront({ value, color, skin, id }: HairProps) {
  const dark = shade(color, -0.28)
  const light = shade(color, 0.18)

  if (value === 8) {
    return <ellipse cx="228" cy="92" rx="56" ry="24" fill="#ffffff" opacity=".06" />
  }

  if (value === 2) {
    return (
      <g>
        <path d={AFRO_FRONT} fill={color} />
        <HairShine id={id}>
          <path d={AFRO_FRONT} />
        </HairShine>
      </g>
    )
  }

  if (value === 3) {
    const puffs = [
      [196, 88, 24],
      [218, 68, 27],
      [246, 58, 29],
      [276, 58, 29],
      [306, 68, 27],
      [330, 88, 24],
      [176, 112, 20],
      [344, 112, 20],
    ] as const
    return (
      <g>
        <g fill={color}>
          {puffs.map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <g fill="none" stroke={dark} strokeWidth="2.2" strokeLinecap="round" opacity=".35">
          <path d="M186 96 C194 86 204 82 214 84" />
          <path d="M218 70 C228 62 240 60 250 64" />
          <path d="M282 62 C292 60 302 64 310 72" />
          <path d="M324 88 C332 92 338 100 340 110" />
          <path d="M178 122 C182 116 188 112 194 112" />
        </g>
        <path d={CURLS_BASE} fill={color} />
        <HairShine id={id}>
          <path d={CURLS_BASE} />
        </HairShine>
      </g>
    )
  }

  if (value === 5) {
    return (
      <g>
        <path d={CAP_FADE} fill={color} />
        <g stroke={alpha(shade(color, -0.4), 0.45)} strokeWidth="2.2" fill="none" strokeLinecap="round">
          <path d="M206 96 C210 84 218 74 228 68" />
          <path d="M232 90 C234 78 240 68 248 62" />
          <path d="M258 88 C258 76 262 66 268 60" />
          <path d="M284 90 C284 78 290 68 298 64" />
          <path d="M308 98 C310 86 318 76 328 70" />
        </g>
        <Loc d="M174 138 C160 196 158 264 164 322" color={color} width={13} />
        <Loc d="M338 138 C352 196 354 264 348 322" color={color} width={13} />
        <Loc d="M156 164 C144 214 142 274 148 330" color={color} width={12} />
        <Loc d="M356 164 C368 214 370 274 364 330" color={color} width={12} />
        <HairShine id={id}>
          <path d={CAP_FADE} />
        </HairShine>
      </g>
    )
  }

  if (value === 6) {
    return (
      <g>
        <path d={LONG_TOP_LEFT} fill={color} />
        <path d={LONG_TOP_LEFT} fill={color} transform="translate(512 0) scale(-1 1)" />
        <path d={LONG_CURTAIN_LEFT} fill={color} />
        <path d={LONG_CURTAIN_LEFT} fill={color} transform="translate(512 0) scale(-1 1)" />
        <HairShine id={id}>
          <path d={LONG_TOP_LEFT} />
          <path d={LONG_TOP_LEFT} transform="translate(512 0) scale(-1 1)" />
          <path d={LONG_CURTAIN_LEFT} />
          <path d={LONG_CURTAIN_LEFT} transform="translate(512 0) scale(-1 1)" />
        </HairShine>
        <path
          d="M160 208 C158 244 158 276 160 302"
          stroke={alpha(shade(color, -0.25), 0.6)}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M352 208 C354 244 354 276 352 302"
          stroke={alpha(shade(color, -0.25), 0.6)}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    )
  }

  if (value === 7) {
    return (
      <g>
        <path d={BOB_BANGS} fill={color} />
        <path d={BOB_SIDE_LEFT} fill={color} />
        <path d={BOB_SIDE_LEFT} fill={color} transform="translate(512 0) scale(-1 1)" />
        <HairShine id={id}>
          <path d={BOB_BANGS} />
        </HairShine>
        <path
          d="M160 210 C158 246 158 280 160 306"
          stroke={alpha(shade(color, -0.25), 0.55)}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M352 210 C354 246 354 280 352 306"
          stroke={alpha(shade(color, -0.25), 0.55)}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    )
  }

  if (value === 9) {
    return (
      <g>
        <path d={POMPADOUR} fill={color} />
        <HairShine id={id}>
          <path d={POMPADOUR} />
        </HairShine>
        <path
          d="M206 146 C222 114 246 88 278 72"
          stroke={alpha(shade(color, -0.3), 0.4)}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    )
  }

  if (value === 4) {
    return (
      <g>
        <defs>
          <clipPath id={`wave-clip-${id}`}>
            <path d={CAP_FADE} />
          </clipPath>
          <linearGradient
            id={`fade-${id}`}
            x1="0"
            y1="114"
            x2="0"
            y2="186"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={skin.base} stopOpacity="0" />
            <stop offset="1" stopColor={skin.base} stopOpacity=".85" />
          </linearGradient>
        </defs>
        <path d={CAP_FADE} fill={color} />
        <g clipPath={`url(#wave-clip-${id})`}>
          <g fill="none" stroke={dark} strokeWidth="2.4" strokeLinecap="round" opacity=".5">
            <path d="M196 86 C218 74 242 70 266 72 C290 74 312 82 330 94" />
            <path d="M184 104 C210 90 240 84 268 86 C296 88 320 96 340 110" />
            <path d="M186 120 C212 108 240 102 266 104 C292 106 314 112 334 122" />
          </g>
          <g fill="none" stroke={light} strokeWidth="1.6" strokeLinecap="round" opacity=".45">
            <path d="M198 82 C220 70 244 66 268 68 C292 70 314 78 332 90" />
            <path d="M186 100 C212 86 242 80 270 82 C298 84 322 92 342 106" />
          </g>
          <rect x="144" y="108" width="30" height="80" fill={`url(#fade-${id})`} />
          <rect x="338" y="108" width="30" height="80" fill={`url(#fade-${id})`} />
        </g>
        <HairShine id={id}>
          <path d={CAP_FADE} />
        </HairShine>
      </g>
    )
  }

  if (value === 1) {
    return (
      <g>
        <defs>
          <pattern id={`buzz-${id}`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.9" fill={light} opacity=".55" />
          </pattern>
        </defs>
        <path d={CAP_BUZZ} fill={color} />
        <path d={CAP_BUZZ} fill={`url(#buzz-${id})`} opacity=".55" />
        <HairShine id={id}>
          <path d={CAP_BUZZ} />
        </HairShine>
      </g>
    )
  }

  // Fade (default)
  return (
    <g>
      <defs>
        <linearGradient
          id={`fade-${id}`}
          x1="0"
          y1="114"
          x2="0"
          y2="186"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={skin.base} stopOpacity="0" />
          <stop offset="1" stopColor={skin.base} stopOpacity=".85" />
        </linearGradient>
        <clipPath id={`fade-clip-${id}`}>
          <path d={CAP_FADE} />
        </clipPath>
      </defs>
      <path d={CAP_FADE} fill={color} />
      <g clipPath={`url(#fade-clip-${id})`}>
        <rect x="146" y="114" width="28" height="74" fill={`url(#fade-${id})`} />
        <rect x="338" y="114" width="28" height="74" fill={`url(#fade-${id})`} />
      </g>
      <HairShine id={id}>
        <path d={CAP_FADE} />
      </HairShine>
      <path
        d="M190 132 C210 126 232 124 256 124 C280 124 302 126 322 132"
        stroke={alpha(shade(color, -0.35), 0.32)}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  )
}
