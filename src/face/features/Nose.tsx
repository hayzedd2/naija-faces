import type { SkinTone } from '../config'
import { shade } from '../color'

type Props = {
  value: number
  skin: SkinTone
  id: string
}

export function Nose({ value, skin, id }: Props) {
  const shadow = shade(skin.shadow, -0.06)
  const dark = shade(skin.shadow, -0.45)
  const light = skin.light

  const defs = (
    <defs>
      <linearGradient
        id={`nose-${id}`}
        x1="0"
        y1="220"
        x2="0"
        y2="320"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor={shadow} stopOpacity="0" />
        <stop offset=".5" stopColor={shadow} stopOpacity=".3" />
        <stop offset="1" stopColor={shadow} stopOpacity=".62" />
      </linearGradient>
      <filter id={`nose-blur-${id}`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.5" />
      </filter>
    </defs>
  )

  if (value === 1) {
    return (
      <g>
        {defs}
        <path
          d="M256 222 C251 242 248 266 244 285 C240 301 242 310 250 313 C254 315 258 315 262 312 C270 308 270 299 266 285 C262 266 260 242 256 222 Z"
          fill={`url(#nose-${id})`}
        />
        <path
          d="M258 228 C261 246 263 266 267 284 C270 298 268 306 262 311 C270 303 271 295 268 283 C265 266 261 246 258 228 Z"
          fill={shadow}
          opacity=".35"
        />
        <path
          d="M253 228 C250 246 248 264 245 282 C243 292 245 300 249 304 C246 298 246 290 248 280 C251 262 254 244 256 228 Z"
          fill={light}
          opacity=".5"
        />
        <ellipse cx="245" cy="306" rx="7" ry="4.5" fill={shadow} opacity=".68" transform="rotate(-14 245 306)" />
        <ellipse cx="267" cy="306" rx="7" ry="4.5" fill={shadow} opacity=".68" transform="rotate(14 267 306)" />
        <ellipse cx="248" cy="307" rx="4.2" ry="2.6" fill={dark} opacity=".85" transform="rotate(-14 248 307)" />
        <ellipse cx="264" cy="307" rx="4.2" ry="2.6" fill={dark} opacity=".85" transform="rotate(14 264 307)" />
        <ellipse cx="255" cy="299" rx="7" ry="5.5" fill={light} opacity=".3" />
        <ellipse cx="256" cy="315" rx="11" ry="3.5" fill={shadow} opacity=".4" filter={`url(#nose-blur-${id})`} />
      </g>
    )
  }

  if (value === 2) {
    return (
      <g>
        {defs}
        <path
          d="M256 230 C252 246 249 262 245 276 C239 291 241 301 249 305 C254 308 261 307 266 303 C273 297 272 288 268 276 C264 262 260 246 256 230 Z"
          fill={`url(#nose-${id})`}
        />
        <path
          d="M259 236 C262 250 264 262 267 276 C270 288 268 296 263 301 C270 294 271 286 268 275 C265 262 262 250 259 236 Z"
          fill={shadow}
          opacity=".32"
        />
        <path
          d="M253 236 C250 248 248 262 245 276 C243 286 245 294 249 298 C246 292 246 284 248 274 C251 260 254 248 256 236 Z"
          fill={light}
          opacity=".45"
        />
        <ellipse cx="256" cy="298" rx="12" ry="8" fill={shadow} opacity=".25" />
        <ellipse cx="245" cy="300" rx="6.5" ry="4" fill={shadow} opacity=".65" transform="rotate(-12 245 300)" />
        <ellipse cx="267" cy="300" rx="6.5" ry="4" fill={shadow} opacity=".65" transform="rotate(12 267 300)" />
        <ellipse cx="248" cy="301" rx="3.8" ry="2.4" fill={dark} opacity=".85" transform="rotate(-12 248 301)" />
        <ellipse cx="264" cy="301" rx="3.8" ry="2.4" fill={dark} opacity=".85" transform="rotate(12 264 301)" />
        <ellipse cx="256" cy="292" rx="9" ry="7" fill={light} opacity=".3" />
        <ellipse cx="256" cy="308" rx="10" ry="3" fill={shadow} opacity=".38" filter={`url(#nose-blur-${id})`} />
      </g>
    )
  }

  if (value === 3) {
    return (
      <g>
        {defs}
        <path
          d="M256 218 C250 240 247 264 243 285 C238 303 240 314 250 317 C255 319 261 318 266 314 C276 308 275 297 271 283 C267 263 261 240 256 218 Z"
          fill={`url(#nose-${id})`}
        />
        <path
          d="M258 224 C262 246 267 266 272 284 C276 300 274 310 266 315 C276 307 278 296 273 282 C269 264 263 244 258 224 Z"
          fill={shadow}
          opacity=".48"
        />
        <path
          d="M253 226 C249 244 246 262 242 280 C240 292 242 301 247 305 C243 298 244 290 247 278 C250 262 253 244 256 226 Z"
          fill={light}
          opacity=".55"
        />
        <ellipse cx="238" cy="308" rx="8.5" ry="4.8" fill={shadow} opacity=".7" transform="rotate(-16 238 308)" />
        <ellipse cx="274" cy="308" rx="8.5" ry="4.8" fill={shadow} opacity=".7" transform="rotate(16 274 308)" />
        <ellipse cx="242" cy="309" rx="5" ry="2.8" fill={dark} opacity=".85" transform="rotate(-16 242 309)" />
        <ellipse cx="270" cy="309" rx="5" ry="2.8" fill={dark} opacity=".85" transform="rotate(16 270 309)" />
        <ellipse cx="254" cy="301" rx="8" ry="6" fill={light} opacity=".3" />
        <ellipse cx="256" cy="318" rx="14" ry="4" fill={shadow} opacity=".42" filter={`url(#nose-blur-${id})`} />
      </g>
    )
  }

  if (value === 4) {
    return (
      <g>
        {defs}
        <path
          d="M256 236 C250 252 245 268 238 283 C230 299 231 311 243 315 C251 318 261 318 269 314 C281 309 281 297 273 283 C266 268 261 252 256 236 Z"
          fill={`url(#nose-${id})`}
        />
        <path
          d="M258 242 C262 256 266 270 272 284 C276 296 275 306 268 312 C277 304 279 294 274 282 C269 268 263 254 258 242 Z"
          fill={shadow}
          opacity=".38"
        />
        <path
          d="M253 244 C249 258 245 272 240 284 C236 294 238 302 243 306 C239 300 240 292 244 282 C249 268 253 254 256 244 Z"
          fill={light}
          opacity=".42"
        />
        <ellipse cx="234" cy="307" rx="10" ry="5.2" fill={shadow} opacity=".68" transform="rotate(-18 234 307)" />
        <ellipse cx="278" cy="307" rx="10" ry="5.2" fill={shadow} opacity=".68" transform="rotate(18 278 307)" />
        <ellipse cx="239" cy="308" rx="6" ry="3" fill={dark} opacity=".85" transform="rotate(-18 239 308)" />
        <ellipse cx="273" cy="308" rx="6" ry="3" fill={dark} opacity=".85" transform="rotate(18 273 308)" />
        <ellipse cx="253" cy="300" rx="7" ry="5" fill={light} opacity=".28" />
        <ellipse cx="256" cy="318" rx="18" ry="4.5" fill={shadow} opacity=".45" filter={`url(#nose-blur-${id})`} />
      </g>
    )
  }

  // Broad
  return (
    <g>
      {defs}
      <path
        d="M256 220 C249 240 244 262 238 281 C231 299 232 310 244 314 C251 317 261 317 268 314 C280 310 281 299 274 281 C268 262 263 240 256 220 Z"
        fill={`url(#nose-${id})`}
      />
      <path
        d="M258 226 C262 246 267 266 272 283 C276 298 274 308 267 313 C276 305 278 296 274 282 C270 264 264 244 258 226 Z"
        fill={shadow}
        opacity=".38"
      />
      <path
        d="M253 226 C249 244 245 262 241 278 C239 288 241 296 246 301 C242 294 243 286 246 275 C249 259 252 242 255 226 Z"
        fill={light}
        opacity=".55"
      />
      <ellipse cx="238" cy="306" rx="9" ry="5" fill={shadow} opacity=".7" transform="rotate(-18 238 306)" />
      <ellipse cx="274" cy="306" rx="9" ry="5" fill={shadow} opacity=".7" transform="rotate(18 274 306)" />
      <ellipse cx="242" cy="307" rx="5.5" ry="3" fill={dark} opacity=".86" transform="rotate(-18 242 307)" />
      <ellipse cx="270" cy="307" rx="5.5" ry="3" fill={dark} opacity=".86" transform="rotate(18 270 307)" />
      <ellipse cx="254" cy="298" rx="8" ry="6" fill={light} opacity=".32" />
      <ellipse cx="256" cy="316" rx="16" ry="4" fill={shadow} opacity=".42" filter={`url(#nose-blur-${id})`} />
      <path
        d="M232 300 C238 296 246 296 252 300"
        stroke={shadow}
        strokeWidth="2"
        fill="none"
        opacity=".5"
        strokeLinecap="round"
      />
      <path
        d="M260 300 C266 296 274 296 280 300"
        stroke={shadow}
        strokeWidth="2"
        fill="none"
        opacity=".5"
        strokeLinecap="round"
      />
    </g>
  )
}
