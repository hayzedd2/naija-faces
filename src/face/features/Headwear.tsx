import type { FabricOption } from '../config'
import { shade } from '../color'

type HeadwearProps = {
  value: number
  fabric: FabricOption
  id: string
}

const GOLD = '#d6a84a'
const GOLD_LIGHT = '#f0d28a'
const GOLD_DARK = '#8a6420'
const CREAM = '#f2e8d8'
const INK = '#231a15'

const GELE_CROWN =
  'M156 150 C134 118 140 80 162 50 C186 18 222 2 262 0 C310 -2 352 16 378 48 C402 78 404 114 394 148 C358 134 320 128 280 128 C236 128 192 136 156 150 Z'

const GELE_BAND =
  'M152 138 C190 152 228 159 264 159 C302 159 342 150 378 135 C380 150 372 164 354 172 C322 184 290 188 256 186 C222 184 190 178 168 166 C154 158 148 148 152 138 Z'

const GELE_BAND_FOLD =
  'M156 140 C194 154 228 160 262 160 C298 160 338 152 374 138 C372 148 366 156 354 162 C324 172 292 176 258 174 C226 172 194 166 172 158 C162 154 158 148 156 140 Z'

const GELE_KNOT =
  'M376 118 C398 108 418 120 420 140 C422 158 410 172 392 172 C400 160 402 146 396 136 C392 128 384 122 376 118 Z'

const GELE_KNOT_INNER =
  'M384 130 C394 126 404 132 406 142 C408 152 402 160 392 160 C396 150 396 140 384 130 Z'

const GELE_TAIL =
  'M390 168 C404 176 410 192 408 210 C406 224 398 236 386 244 C390 226 388 210 380 194 C376 184 380 174 390 168 Z'

const GELE_WRAP =
  'M156 150 C160 108 180 66 214 38 C244 14 282 2 320 4 C300 30 278 52 262 78 C244 108 236 132 238 150 Z'

const FILAH_MAIN =
  'M256 32 C318 32 360 62 366 116 C368 128 366 140 360 150 L152 150 C146 140 144 128 146 116 C152 62 194 32 256 32 Z'

const FILAH_TOP =
  'M256 32 C300 32 338 46 354 72 C330 58 296 50 256 50 C216 50 182 58 158 72 C174 46 212 32 256 32 Z'

const FILAH_BAND =
  'M152 112 C192 126 224 132 256 132 C288 132 320 126 360 112 L360 150 L152 150 Z'

const OKPU_MAIN =
  'M256 30 C318 30 360 60 366 114 C368 126 366 138 360 148 L152 148 C146 138 144 126 146 114 C152 60 194 30 256 30 Z'

const OKPU_TOP =
  'M256 30 C300 30 336 44 352 70 C328 56 294 48 256 48 C218 48 184 56 160 70 C176 44 212 30 256 30 Z'

const OKPU_BAND =
  'M152 114 C192 128 224 134 256 134 C288 134 320 128 360 114 L360 148 L152 148 Z'

const KUFI_MAIN =
  'M256 32 C318 32 360 64 364 118 C365 130 363 141 358 150 L154 150 C149 141 147 130 148 118 C152 64 194 32 256 32 Z'

const KUFI_TOP =
  'M256 32 C300 32 336 46 352 70 C328 58 294 50 256 50 C218 50 184 58 160 70 C176 46 212 32 256 32 Z'

const KUFI_BAND =
  'M152 110 C192 124 224 130 256 130 C288 130 320 124 360 110 L360 150 L152 150 Z'

function AsoPattern({ fabric, scope, id }: { fabric: FabricOption; scope: string; id: string }) {
  return (
    <pattern
      id={`aso-${scope}-${id}`}
      width="18"
      height="18"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(16)"
    >
      <rect width="18" height="18" fill={fabric.value} />
      <rect width="6" height="18" fill={shade(fabric.value, 0.28)} opacity=".9" />
      <rect x="9" width="2" height="18" fill={GOLD_LIGHT} opacity=".85" />
    </pattern>
  )
}

function fabricFill(fabric: FabricOption, scope: string, id: string): string {
  return fabric.pattern ? `url(#aso-${scope}-${id})` : fabric.value
}

function Gele({ fabric, id }: { fabric: FabricOption; id: string }) {
  const fill = fabricFill(fabric, 'front', id)
  const dark = shade(fabric.value, -0.26)
  const outer = shade(fabric.value, -0.14)
  const light = shade(fabric.value, 0.2)
  return (
    <g>
      <defs>
        {fabric.pattern && <AsoPattern fabric={fabric} scope="front" id={id} />}
        <clipPath id={`gele-clip-${id}`}>
          <path d={GELE_CROWN} />
        </clipPath>
      </defs>
      <path d={GELE_CROWN} fill={fill} />
      <g clipPath={`url(#gele-clip-${id})`}>
        <path
          d="M156 150 C146 114 156 74 180 46 C200 22 228 8 256 6 C226 26 206 50 196 78 C186 106 188 130 196 150 Z"
          fill={outer}
        />
        <path
          d="M394 148 C404 116 400 82 380 52 C362 26 336 10 304 4 C330 24 348 50 356 80 C364 110 362 130 356 148 Z"
          fill={light}
          opacity=".45"
        />
        <path d={GELE_WRAP} fill={outer} opacity=".9" />
        <path
          d={GELE_WRAP}
          fill="none"
          stroke={dark}
          strokeWidth="1.6"
          opacity=".35"
          strokeLinecap="round"
        />
        <path
          d="M238 150 C240 120 248 92 264 66 C280 40 300 18 324 4 C342 24 350 48 350 74 C350 104 342 130 330 150 Z"
          fill={light}
          opacity=".38"
        />
        <path
          d="M196 150 C212 110 238 72 274 42 C298 24 324 14 350 12"
          fill="none"
          stroke={light}
          strokeWidth="2.2"
          opacity=".55"
          strokeLinecap="round"
        />
        <g stroke={dark} strokeWidth="2" fill="none" opacity=".38" strokeLinecap="round">
          <path d="M192 148 C186 112 196 76 218 48" />
          <path d="M224 150 C220 110 228 74 246 40" />
          <path d="M258 150 C256 108 262 72 276 34" />
          <path d="M292 150 C292 110 300 76 314 44" />
          <path d="M326 148 C328 112 336 82 350 58" />
        </g>
        <g stroke={light} strokeWidth="1.4" fill="none" opacity=".5" strokeLinecap="round">
          <path d="M206 148 C202 112 210 78 230 50" />
          <path d="M242 150 C240 110 246 74 262 38" />
          <path d="M276 150 C276 110 284 76 300 42" />
          <path d="M310 148 C312 114 320 84 334 60" />
        </g>
        <path
          d="M156 150 C196 134 236 128 280 128 C320 128 358 134 394 148 L394 156 L156 156 Z"
          fill={dark}
          opacity=".14"
        />
      </g>
      <path d={GELE_BAND} fill={fill} />
      <path d={GELE_BAND_FOLD} fill={light} opacity=".3" />
      <path d={GELE_BAND} fill="none" stroke={dark} strokeWidth="1.8" opacity=".38" />
      <path d={GELE_TAIL} fill={outer} />
      <path d={GELE_TAIL} fill="none" stroke={dark} strokeWidth="1.4" opacity=".35" />
      <path d={GELE_KNOT} fill={fill} />
      <path d={GELE_KNOT} fill="none" stroke={dark} strokeWidth="1.4" opacity=".4" />
      <path d={GELE_KNOT_INNER} fill={light} opacity=".55" />
      <path
        d="M176 150 C210 160 240 164 268 164 C304 164 340 156 372 144"
        stroke={light}
        strokeWidth="1.6"
        fill="none"
        opacity=".55"
        strokeLinecap="round"
      />
    </g>
  )
}

function Filah({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <clipPath id={`filah-clip-${id}`}>
          <path d={FILAH_MAIN} />
        </clipPath>
      </defs>
      <path d={FILAH_MAIN} fill="#2f4f7f" />
      <path d={FILAH_TOP} fill="#4a6fa5" opacity=".75" />
      <g clipPath={`url(#filah-clip-${id})`}>
        <g stroke={GOLD} strokeWidth="1.3" opacity=".75" strokeLinecap="round">
          <path d="M196 58 L196 108" />
          <path d="M220 52 L220 112" />
          <path d="M244 48 L244 118" />
          <path d="M268 48 L268 118" />
          <path d="M292 52 L292 112" />
          <path d="M316 58 L316 108" />
        </g>
        <g stroke={GOLD_LIGHT} strokeWidth="1" opacity=".55" strokeLinecap="round">
          <path d="M186 62 L186 100" />
          <path d="M326 62 L326 100" />
        </g>
        <g fill={GOLD} opacity=".8">
          <path d="M204 78 L212 70 L220 78 L212 86 Z" />
          <path d="M252 72 L260 64 L268 72 L260 80 Z" />
          <path d="M300 78 L308 70 L316 78 L308 86 Z" />
        </g>
      </g>
      <path d={FILAH_BAND} fill={GOLD} />
      <path d={FILAH_BAND} fill="none" stroke={GOLD_DARK} strokeWidth="1.3" opacity=".55" />
      <path
        d="M162 116 C196 128 226 134 256 134 C286 134 316 128 350 116"
        stroke={GOLD_LIGHT}
        strokeWidth="1.4"
        fill="none"
        opacity=".7"
      />
      <path
        d="M256 32 C286 32 312 40 330 56"
        stroke="#8a6420"
        strokeWidth="1.4"
        fill="none"
        opacity=".35"
      />
      <circle cx="256" cy="33" r="5" fill={GOLD} stroke={GOLD_DARK} strokeWidth="1" />
    </g>
  )
}

function OkpuAgu({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <clipPath id={`okpu-clip-${id}`}>
          <path d={OKPU_MAIN} />
        </clipPath>
        <pattern
          id={`okpu-stripes-${id}`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-5)"
        >
          <rect width="24" height="24" fill="#b23a2e" />
          <rect width="24" height="7" fill={INK} />
          <rect y="12" width="24" height="2.6" fill={CREAM} opacity=".85" />
        </pattern>
        <clipPath id={`okpu-band-clip-${id}`}>
          <path d={OKPU_BAND} />
        </clipPath>
        <pattern
          id={`leopard-${id}`}
          width="20"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="20" height="16" fill="#e7cfa6" />
          <ellipse cx="6" cy="5" rx="3" ry="2.2" fill="#8a5a32" opacity=".85" />
          <ellipse cx="16" cy="11" rx="2.6" ry="2" fill="#8a5a32" opacity=".85" />
          <ellipse cx="11" cy="1" rx="1.6" ry="1.2" fill="#5a3520" opacity=".7" />
        </pattern>
      </defs>
      <path d={OKPU_MAIN} fill={`url(#okpu-stripes-${id})`} />
      <g clipPath={`url(#okpu-clip-${id})`}>
        <path d={OKPU_TOP} fill="#c94a3c" opacity=".45" />
        <path d={OKPU_BAND} fill={`url(#leopard-${id})`} />
        <path d={OKPU_BAND} fill="none" stroke="#6b4426" strokeWidth="1.2" opacity=".55" />
      </g>
      <g transform="translate(330 22) rotate(12)">
        <path d="M0 104 C8 66 20 34 48 4 C54 30 48 60 32 82 C24 94 12 104 0 104 Z" fill={CREAM} />
        <path d="M20 84 C28 58 36 36 48 12 C44 40 36 66 24 88 Z" fill="#b23a2e" opacity=".9" />
        <path d="M2 100 C10 64 24 32 48 6" stroke={INK} strokeWidth="1.6" fill="none" />
        <g stroke={INK} strokeWidth="1" fill="none" opacity=".5">
          <path d="M12 86 C18 66 28 44 42 24" />
          <path d="M8 94 C16 70 26 48 38 30" />
        </g>
      </g>
      <path
        d="M340 112 C346 104 356 102 364 108 C358 116 352 124 348 132 C344 126 342 118 340 112 Z"
        fill={`url(#leopard-${id})`}
        stroke="#6b4426"
        strokeWidth="1"
      />
    </g>
  )
}

function Kufi({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <clipPath id={`kufi-clip-${id}`}>
          <path d={KUFI_BAND} />
        </clipPath>
        <pattern id={`kufi-dots-${id}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <path
            d="M11 3 L19 11 L11 19 L3 11 Z"
            fill="none"
            stroke={CREAM}
            strokeWidth="1.3"
            opacity=".85"
          />
          <circle cx="11" cy="11" r="1.8" fill="#e2725b" opacity=".9" />
        </pattern>
      </defs>
      <path d={KUFI_MAIN} fill="#e9d9b8" />
      <path d={KUFI_TOP} fill="#f6ecd8" />
      <g clipPath={`url(#kufi-clip-${id})`}>
        <path d={KUFI_BAND} fill="#7a4a2e" />
        <rect x="148" y="104" width="216" height="48" fill={`url(#kufi-dots-${id})`} />
      </g>
      <path d={KUFI_BAND} fill="none" stroke="#5a3520" strokeWidth="1.4" opacity=".55" />
      <path
        d="M164 116 C198 128 226 134 256 134 C286 134 314 128 348 116"
        stroke={CREAM}
        strokeWidth="1.3"
        fill="none"
        opacity=".45"
      />
      <path
        d="M256 32 C300 32 336 46 352 70"
        stroke="#d9c4a0"
        strokeWidth="1.4"
        fill="none"
        opacity=".7"
      />
      <circle cx="256" cy="34" r="4.6" fill="#7a4a2e" />
      <circle cx="256" cy="32.8" r="1.6" fill="#e9d9b8" opacity=".75" />
    </g>
  )
}

export function HeadwearFront({ value, fabric, id }: HeadwearProps) {
  if (value === 1) return <Gele fabric={fabric} id={id} />
  if (value === 2) return <Filah id={id} />
  if (value === 3) return <OkpuAgu id={id} />
  if (value === 4) return <Kufi id={id} />
  return null
}
