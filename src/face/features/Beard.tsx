import type { SkinTone } from '../config'
import { alpha, shade } from '../color'
import { facePath } from '../geometry'

type BeardProps = {
  value: number
  color: string
  skin: SkinTone
  shape: number
  id: string
}

export function beardHasMustache(value: number): boolean {
  return value === 1 || value === 2 || value === 3 || value === 5 || value === 6
}

export function BeardBase({ value, color, shape, id }: BeardProps) {
  if (value === 0 || value === 2) return null

  const dark = shade(color, -0.3)
  const light = shade(color, 0.18)
  const path = facePath(shape)
  const clip = `url(#beard-clip-${id})`

  const defs = (
    <defs>
      <clipPath id={`beard-clip-${id}`}>
        <path d={path} />
      </clipPath>
      <mask id={`beard-fade-${id}`} maskUnits="userSpaceOnUse" x="0" y="236" width="512" height="276">
        <rect x="0" y="236" width="512" height="276" fill={`url(#beard-fade-grad-${id})`} />
      </mask>
      <linearGradient
        id={`beard-fade-grad-${id}`}
        x1="0"
        y1="248"
        x2="0"
        y2="312"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#000000" />
        <stop offset="1" stopColor="#ffffff" />
      </linearGradient>
      <pattern id={`stubble-${id}`} width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r=".75" fill={color} />
        <circle cx="3" cy="2.8" r=".6" fill={color} />
      </pattern>
    </defs>
  )

  if (value === 1) {
    return (
      <g>
        {defs}
        <g clipPath={clip}>
          <path
            d="M150 296 C176 322 214 346 240 356 C248 359 252 361 256 361 C260 361 264 359 272 356 C298 346 336 322 362 296 L362 512 L150 512 Z"
            fill={`url(#stubble-${id})`}
            opacity=".62"
          />
        </g>
      </g>
    )
  }

  if (value === 4) {
    return (
      <g>
        {defs}
        <g clipPath={clip} mask={`url(#beard-fade-${id})`}>
          <path d={path} fill="none" stroke={color} strokeWidth="26" />
          <path
            d={path}
            fill="none"
            stroke={alpha(light, 0.3)}
            strokeWidth="2"
            transform="translate(0 -0.6)"
          />
        </g>
      </g>
    )
  }

  if (value === 5) {
    return (
      <g>
        {defs}
        <g clipPath={clip}>
          <path
            d="M150 286 C176 316 214 344 240 356 C248 359 252 361 256 361 C260 361 264 359 272 356 C298 344 336 316 362 286 L362 512 L150 512 Z"
            fill={color}
          />
          <path
            d="M256 362 C246 362 240 365 236 370 C242 376 249 379 256 379 C263 379 270 376 276 370 C272 365 266 362 256 362 Z"
            fill={dark}
            opacity=".55"
          />

        </g>
      </g>
    )
  }

  if (value === 6) {
    return (
      <g>
        {defs}
        <g clipPath={clip}>
          <path
            d="M154 306 C180 330 216 352 240 362 C248 365 252 367 256 367 C260 367 264 365 272 362 C296 352 332 330 358 306 L358 512 L154 512 Z"
            fill={color}
            opacity=".92"
          />
          <path
            d="M256 356 C247 356 241 359 237 364 C243 369 249 372 256 372 C263 372 269 369 275 364 C271 359 265 356 256 356 Z"
            fill={dark}
            opacity=".45"
          />

        </g>
      </g>
    )
  }

  // Goatee
  return (
    <g>
      {defs}
      <g clipPath={clip}>
        <path
          d="M228 346 C238 338 274 338 284 346 C292 364 280 386 256 392 C232 386 220 364 228 346 Z"
          fill={color}
        />
        <ellipse cx="256" cy="364" rx="10" ry="7" fill={light} opacity=".22" />
      </g>
    </g>
  )
}

type MustacheProps = {
  color: string
  full?: boolean
}

export function Mustache({ color, full = false }: MustacheProps) {
  const path = full
    ? 'M256 336 C245 329 230 327 219 331 C210 335 209 343 217 346 C229 341 243 340 252 344 C254 345 255 342 256 336 Z'
    : 'M256 337 C247 332 235 330 225 333 C217 335 215 341 221 344 C230 340 241 339 251 342 C253 343 255 341 256 337 Z'
  const light = shade(color, 0.18)
  return (
    <g fill={color}>
      <path d={path} />
      <path d={path} transform="translate(512 0) scale(-1 1)" />
      <g stroke={light} strokeWidth="1.1" strokeLinecap="round" opacity=".45">
        <path d="M230 337 C238 335 245 336 251 340" />
        <path d="M282 337 C274 335 267 336 261 340" />
        {full && <path d="M222 340 C230 337 238 337 244 340" />}
        {full && <path d="M290 340 C282 337 274 337 268 340" />}
      </g>
    </g>
  )
}
