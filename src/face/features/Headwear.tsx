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

/* ───── GELE ───────────────────────────────────────────────────────────── */

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
  const base = fabric.value
  const deep = shade(base, -0.4)
  const light = shade(base, 0.2)
  const highlight = shade(base, 0.36)

  // Wide wrapped crown with tapered side tails and an arched forehead opening.
  const silhouette =
    'M56 150 C42 90 66 28 110 -12 C150 -48 202 -70 256 -70 C310 -70 362 -48 402 -12 C446 28 470 90 456 150 C452 190 438 220 418 238 C406 248 388 248 376 238 C368 230 362 220 360 210 C356 180 334 148 302 124 C286 112 270 104 256 96 C242 104 226 112 210 124 C178 148 156 180 152 210 C150 220 144 230 136 238 C124 248 106 248 94 238 C74 220 60 190 56 150 Z'
  const band =
    'M144 220 C146 184 172 150 204 126 C224 110 242 102 256 102 C270 102 288 110 308 126 C340 150 366 184 368 220 L368 194 C366 160 340 126 308 102 C288 86 270 78 256 78 C242 78 224 86 204 102 C172 126 146 160 144 194 Z'
  const bandOuter =
    'M144 220 C146 184 172 150 204 126 C224 110 242 102 256 102 C270 102 288 110 308 126 C340 150 366 184 368 220'
  const bandInner =
    'M144 194 C146 160 172 126 204 102 C224 86 242 78 256 78 C270 78 288 86 308 102 C340 126 366 160 368 194'

  const pleats = Array.from({ length: 13 }, (_, index) => {
    const t = index / 12
    const startX = 158 + t * 196
    const startY = 202 - Math.sin(Math.PI * t) * 100
    const endX = 64 + t * 384
    const endY = 26 - Math.sin(Math.PI * t) * 72
    const ctrlX = startX + (endX - startX) * 0.3
    const ctrlY = startY - 102
    return { startX, startY, endX, endY, ctrlX, ctrlY }
  })

  return (
    <g>
      <defs>
        {fabric.pattern && <AsoPattern fabric={fabric} scope="front" id={id} />}
        <clipPath id={`gele-clip-${id}`}>
          <path d={silhouette} />
        </clipPath>
        <linearGradient id={`gele-volume-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={highlight} stopOpacity=".4" />
          <stop offset=".5" stopColor={highlight} stopOpacity="0" />
          <stop offset="1" stopColor={deep} stopOpacity=".46" />
        </linearGradient>
        <linearGradient id={`gele-band-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={highlight} stopOpacity=".6" />
          <stop offset=".5" stopColor={base} stopOpacity="0" />
          <stop offset="1" stopColor={deep} stopOpacity=".5" />
        </linearGradient>
      </defs>

      <path d={silhouette} fill={fill} />

      <g clipPath={`url(#gele-clip-${id})`}>
        {/* Broad volume: shadow on the left, light on the right. */}
        <path
          d="M56 150 C42 90 66 28 110 -12 C150 -48 202 -70 256 -70 C212 -58 172 -28 146 16 C120 60 108 108 116 150 C122 188 136 214 146 232 C132 244 112 244 98 232 C76 212 60 186 56 150 Z"
          fill={deep}
          opacity=".36"
        />
        <path
          d="M456 150 C470 90 446 28 402 -12 C362 -48 310 -70 256 -70 C306 -52 348 -18 372 28 C396 72 404 118 396 156 C390 196 376 224 366 238 C380 248 398 246 412 232 C434 212 450 186 456 150 Z"
          fill={light}
          opacity=".32"
        />

        {/* Layered top folds break up the dome. */}
        <path
          d="M110 -12 C140 -50 180 -68 220 -70 C210 -40 196 -14 176 8 C150 0 128 -6 110 -12 Z"
          fill={light}
          opacity=".22"
        />
        <path
          d="M220 -70 C240 -74 272 -74 292 -70 C288 -40 278 -14 264 6 C246 4 230 -2 216 0 C212 -24 214 -48 220 -70 Z"
          fill={highlight}
          opacity=".16"
        />
        <path
          d="M292 -70 C334 -66 372 -48 402 -12 C384 -2 362 2 340 0 C322 -24 306 -48 292 -70 Z"
          fill={deep}
          opacity=".16"
        />
        <g fill="none" stroke={deep} strokeWidth="1.6" opacity=".22" strokeLinecap="round">
          <path d="M110 -12 C140 -50 180 -68 220 -70" />
          <path d="M220 -70 C240 -74 272 -74 292 -70" />
          <path d="M292 -70 C334 -66 372 -48 402 -12" />
        </g>

        {/* Radiating folds — broad dark pleats with bright ridge highlights. */}
        <g fill="none" strokeLinecap="round">
          {pleats.map((pleat, index) => (
            <path
              key={`dark-${index}`}
              d={`M${pleat.startX} ${pleat.startY} Q${pleat.ctrlX} ${pleat.ctrlY} ${pleat.endX} ${pleat.endY}`}
              stroke={deep}
              strokeWidth={index % 2 === 0 ? 12 : 8}
              opacity=".3"
            />
          ))}
          {pleats.map((pleat, index) => (
            <path
              key={`light-${index}`}
              d={`M${pleat.startX + 8} ${pleat.startY - 5} Q${pleat.ctrlX + 8} ${pleat.ctrlY - 5} ${pleat.endX + 8} ${pleat.endY - 5}`}
              stroke={highlight}
              strokeWidth={index % 2 === 0 ? 5 : 3}
              opacity=".42"
            />
          ))}
        </g>

        {/* Broad diagonal wrap fold across the crown. */}
        <path
          d="M104 196 C150 150 214 96 286 54 C332 28 374 12 410 8 C388 34 360 66 330 94 C292 130 250 168 218 198 Z"
          fill={light}
          opacity=".2"
        />
        <path
          d="M104 196 C150 150 214 96 286 54 C332 28 374 12 410 8"
          fill="none"
          stroke={highlight}
          strokeWidth="2.4"
          opacity=".34"
          strokeLinecap="round"
        />

        {/* Shadow tucked under the front roll. */}
        <path
          d="M152 224 C178 188 206 160 230 144 C242 136 250 130 256 126 C262 130 270 136 282 144 C306 160 334 188 360 224 L360 210 C356 180 334 148 302 124 C286 112 270 104 256 96 C242 104 226 112 210 124 C178 148 156 180 152 210 Z"
          fill={deep}
          opacity=".26"
        />

        <path d={silhouette} fill={`url(#gele-volume-${id})`} />
      </g>

      {/* Thick rolled band following the forehead arch. */}
      <path d={band} fill={fill} />
      <path d={band} fill={`url(#gele-band-${id})`} />
      <path
        d={bandOuter}
        fill="none"
        stroke={deep}
        strokeWidth="2.6"
        opacity=".55"
        strokeLinecap="round"
      />
      <path
        d={bandInner}
        fill="none"
        stroke={highlight}
        strokeWidth="2"
        opacity=".55"
        strokeLinecap="round"
      />
      <path
        d="M150 200 C176 168 202 142 228 124 C242 114 250 108 256 104 C262 108 270 114 284 124 C310 142 336 168 362 200"
        fill="none"
        stroke={highlight}
        strokeWidth="1.4"
        opacity=".28"
        strokeLinecap="round"
      />
      <path d={silhouette} fill="none" stroke={deep} strokeWidth="1.5" opacity=".38" />
    </g>
  )
}

/* ───── FILAH ──────────────────────────────────────────────────────────── */

function Filah({ id }: { id: string }) {
  const navy = '#2b4268'
  const navyDark = '#1b2e4c'
  const navyLight = '#41618f'
  const navyDeep = '#13233b'

  // Tall folded cloth cap: peaked top, sloped sides and a wide gold edge.
  const silhouette =
    'M140 158 C132 130 138 102 156 82 C174 62 198 48 222 40 C236 22 258 14 280 22 C308 34 338 58 358 90 C374 116 382 140 380 158 C338 168 298 172 258 172 C218 172 178 168 140 158 Z'

  return (
    <g>
      <defs>
        <clipPath id={`filah-clip-${id}`}>
          <path d={silhouette} />
        </clipPath>
        <pattern
          id={`filah-weave-${id}`}
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="28" height="28" fill={navy} />
          <path d="M0 14 H28 M14 0 V28" stroke={GOLD} strokeWidth="1.6" opacity=".75" />
          <circle cx="14" cy="14" r="2.1" fill={GOLD_LIGHT} opacity=".7" />
          <circle cx="0" cy="0" r="1.5" fill={GOLD_LIGHT} opacity=".45" />
          <circle cx="28" cy="28" r="1.5" fill={GOLD_LIGHT} opacity=".45" />
        </pattern>
        <linearGradient id={`filah-shade-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={navyLight} stopOpacity=".38" />
          <stop offset=".55" stopColor={navy} stopOpacity="0" />
          <stop offset="1" stopColor={navyDeep} stopOpacity=".45" />
        </linearGradient>
      </defs>

      <path d={silhouette} fill={navy} />

      <g clipPath={`url(#filah-clip-${id})`}>
        {/* Woven lower-right panel. */}
        <path
          d="M146 160 C206 140 266 116 326 86 C346 76 364 64 380 56 L394 180 L146 180 Z"
          fill={`url(#filah-weave-${id})`}
        />

        {/* Solid folded panel on the upper left. */}
        <path
          d="M140 158 C132 130 138 102 156 82 C174 62 198 48 222 40 C236 22 258 14 280 22 C308 34 338 58 358 90 C326 84 294 80 264 86 C222 94 182 118 148 160 Z"
          fill={navyLight}
          opacity=".72"
        />

        {/* Strong diagonal fold between the panels. */}
        <path
          d="M142 160 C188 138 234 114 276 86 C308 64 340 48 368 40 C352 64 328 88 302 110 C264 142 222 166 188 174 Z"
          fill={navyDark}
          opacity=".9"
        />
        <path
          d="M142 160 C188 138 234 114 276 86 C308 64 340 48 368 40"
          fill="none"
          stroke={GOLD_LIGHT}
          strokeWidth="1.6"
          opacity=".6"
        />
        <path
          d="M154 168 C198 148 244 122 286 94 C316 74 344 58 370 50"
          fill="none"
          stroke={navyDeep}
          strokeWidth="1.3"
          opacity=".45"
        />

        {/* Folded peak at the top. */}
        <path
          d="M222 40 C236 22 258 14 280 22 C298 30 316 42 330 56 C306 50 282 50 260 54 C244 56 230 50 222 40 Z"
          fill={navyLight}
          opacity=".6"
        />
        <path
          d="M222 40 C236 22 258 14 280 22"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.2"
          opacity=".55"
        />

        {/* Fine woven texture over the solid panel. */}
        <path
          d="M140 158 C132 130 138 102 156 82 C174 62 198 48 222 40 C236 22 258 14 280 22 C308 34 338 58 358 90 C326 84 294 80 264 86 C222 94 182 118 148 160 Z"
          fill={`url(#filah-weave-${id})`}
          opacity=".18"
        />

        <path d={silhouette} fill={`url(#filah-shade-${id})`} />
      </g>

      {/* Wide gold edge along the lower rim. */}
      <path
        d="M140 158 C178 168 218 172 258 172 C298 172 338 168 380 158 L380 144 C338 154 298 158 258 158 C218 158 178 154 140 144 Z"
        fill={GOLD}
      />
      <path
        d="M140 158 C178 168 218 172 258 172 C298 172 338 168 380 158"
        fill="none"
        stroke={GOLD_DARK}
        strokeWidth="1.8"
        opacity=".65"
      />
      <path
        d="M148 150 C184 160 222 164 258 164 C294 164 332 160 372 150"
        fill="none"
        stroke={GOLD_LIGHT}
        strokeWidth="1.5"
        opacity=".6"
      />
      <path
        d="M140 144 C178 154 218 158 258 158 C298 158 338 154 380 144"
        fill="none"
        stroke={GOLD_DARK}
        strokeWidth="1.2"
        opacity=".45"
      />
      <g fill={GOLD_DARK} opacity=".6">
        <path d="M194 154 L200 148 L206 154 L200 160 Z" />
        <path d="M250 156 L256 150 L262 156 L256 162 Z" />
        <path d="M308 154 L314 148 L320 154 L314 160 Z" />
      </g>

      <path d={silhouette} fill="none" stroke={navyDeep} strokeWidth="1.3" opacity=".55" />
    </g>
  )
}

/* ───── OKPU AGU ───────────────────────────────────────────────────────── */

function OkpuAgu({ id }: { id: string }) {
  const red = '#c93528'
  const redDark = '#a02a20'
  const redLight = '#d94838'

  return (
    <g>
      <defs>
        <clipPath id={`okpu-clip-${id}`}>
          <path d="M256 46 C316 46 358 72 364 118 C366 128 364 138 360 148 L152 148 C148 138 146 128 148 118 C154 72 196 46 256 46 Z" />
        </clipPath>
        <pattern
          id={`okpu-stripes-${id}`}
          width="512"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect width="512" height="18" fill={red} />
          <rect width="512" height="4" y="0" fill={INK} />
          <rect width="512" height="2.4" y="5" fill={CREAM} opacity=".9" />
          <rect width="512" height="2.4" y="8.5" fill={CREAM} opacity=".9" />
          <rect width="512" height="4" y="14" fill={INK} />
        </pattern>
      </defs>

      <path
        d="M256 46 C316 46 358 72 364 118 C366 128 364 138 360 148 L152 148 C148 138 146 128 148 118 C154 72 196 46 256 46 Z"
        fill={red}
      />

      <g clipPath={`url(#okpu-clip-${id})`}>
        <rect x="140" y="40" width="240" height="120" fill={`url(#okpu-stripes-${id})`} />
        <path
          d="M256 46 C306 46 344 62 358 88 C334 72 298 62 256 62 C214 62 178 72 154 88 C168 62 206 46 256 46 Z"
          fill={redLight}
          opacity=".4"
        />
        <path
          d="M148 118 C154 72 196 46 256 46 C210 50 180 72 170 102 C166 114 162 128 160 148 L152 148 C148 138 146 128 148 118 Z"
          fill={INK}
          opacity=".12"
        />
      </g>

      <path
        d="M256 46 C316 46 358 72 364 118 C366 128 364 138 360 148 L152 148 C148 138 146 128 148 118 C154 72 196 46 256 46 Z"
        fill="none"
        stroke={redDark}
        strokeWidth="1.2"
        opacity=".5"
      />

      {/* Eagle feather */}
      <g transform="translate(340 38) rotate(15)">
        <path d="M0 80 C6 50 14 24 30 0 C36 22 30 48 20 66 C14 76 6 82 0 80 Z" fill={CREAM} />
        <path d="M12 64 C18 42 24 22 30 4 C26 28 20 50 16 68 Z" fill={red} opacity=".85" />
        <path d="M2 78 C8 48 18 22 30 2" stroke={INK} strokeWidth="1.4" fill="none" />
        <g stroke={INK} strokeWidth=".8" fill="none" opacity=".4">
          <path d="M8 68 C14 54 20 38 28 20" />
          <path d="M4 74 C12 56 20 40 26 26" />
        </g>
      </g>

      <path
        d="M346 114 C352 108 360 108 366 114 C360 120 354 126 350 132 C348 126 346 120 346 114 Z"
        fill="#e7cfa6"
        stroke="#6b4426"
        strokeWidth=".8"
      />
    </g>
  )
}

/* ───── FULA / KUFI ────────────────────────────────────────────────────── */

function Kufi({ id }: { id: string }) {
  const capColor = '#e9d9b8'
  const capLight = '#f6ecd8'
  const capShadow = '#d4c4a0'
  const bandColor = '#6b3a1e'
  const bandLight = '#8a5430'
  const accentCoral = '#d07050'

  return (
    <g>
      <defs>
        <clipPath id={`kufi-clip-${id}`}>
          <path d="M256 42 C318 42 360 58 366 96 C368 108 368 120 366 132 C364 140 360 146 356 150 L156 150 C152 146 148 140 146 132 C144 120 144 108 146 96 C152 58 194 42 256 42 Z" />
        </clipPath>
        <pattern id={`kufi-geo-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill={bandColor} />
          <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke={capColor} strokeWidth="1.6" opacity=".8" />
          <path d="M12 6 L18 12 L12 18 L6 12 Z" fill="none" stroke={capColor} strokeWidth="1" opacity=".5" />
          <circle cx="12" cy="12" r="2" fill={accentCoral} opacity=".85" />
          <circle cx="0" cy="0" r="1.2" fill={accentCoral} opacity=".6" />
          <circle cx="24" cy="0" r="1.2" fill={accentCoral} opacity=".6" />
          <circle cx="0" cy="24" r="1.2" fill={accentCoral} opacity=".6" />
          <circle cx="24" cy="24" r="1.2" fill={accentCoral} opacity=".6" />
        </pattern>
      </defs>

      <path
        d="M256 42 C318 42 360 58 366 96 C368 108 368 120 366 132 C364 140 360 146 356 150 L156 150 C152 146 148 140 146 132 C144 120 144 108 146 96 C152 58 194 42 256 42 Z"
        fill={capColor}
      />

      <g clipPath={`url(#kufi-clip-${id})`}>
        <path
          d="M256 42 C306 42 344 52 358 72 C334 58 298 50 256 50 C214 50 178 58 154 72 C168 52 206 42 256 42 Z"
          fill={capLight}
        />
        <g stroke={capShadow} strokeWidth=".8" fill="none" opacity=".3">
          <path d="M190 52 L188 98" />
          <path d="M210 48 L208 100" />
          <path d="M230 46 L228 102" />
          <path d="M250 44 L248 104" />
          <path d="M270 44 L268 104" />
          <path d="M290 46 L288 102" />
          <path d="M310 48 L308 100" />
          <path d="M330 52 L328 98" />
        </g>
        <rect x="140" y="104" width="232" height="50" fill={`url(#kufi-geo-${id})`} />
        <path
          d="M148 104 C192 114 226 118 256 118 C286 118 320 114 364 104"
          stroke={bandLight}
          strokeWidth="2"
          fill="none"
          opacity=".7"
        />
        <path
          d="M152 108 C194 118 228 122 256 122 C284 122 318 118 360 108"
          stroke={capColor}
          strokeWidth="1"
          fill="none"
          opacity=".5"
        />
      </g>

      <path
        d="M256 42 C318 42 360 58 366 96 C368 108 368 120 366 132 C364 140 360 146 356 150 L156 150 C152 146 148 140 146 132 C144 120 144 108 146 96 C152 58 194 42 256 42 Z"
        fill="none"
        stroke={bandColor}
        strokeWidth="1.2"
        opacity=".4"
      />
      <path
        d="M256 44 C296 44 330 52 350 66"
        stroke={capShadow}
        strokeWidth="1.4"
        fill="none"
        opacity=".5"
      />
      <circle cx="256" cy="44" r="4.5" fill={bandColor} />
      <circle cx="255" cy="43" r="1.6" fill={capColor} opacity=".6" />
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
