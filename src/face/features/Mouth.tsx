import type { SkinTone } from '../config'
import { alpha, mix, shade } from '../color'

type Props = {
  value: number
  skin: SkinTone
  id: string
}

export function Mouth({ value, skin, id }: Props) {
  const lip = skin.lip
  const lipLight = mix(lip, skin.light, 0.22)
  const lipDark = shade(lip, -0.32)
  const lipShadow = alpha(lipDark, 0.55)

  const shadow = (
    <ellipse
      cx="256"
      cy="371"
      rx="25"
      ry="7"
      fill={skin.shadow}
      opacity=".22"
      filter={`url(#mouth-blur-${id})`}
    />
  )

  const defs = (
    <defs>
      <filter id={`mouth-blur-${id}`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  )

  if (value === 1) {
    return (
      <g>
        {defs}
        {shadow}
        <path
          d="M218 342 C230 337 242 337 250 342 C252 344 260 344 262 342 C270 337 282 337 294 342 C282 345 268 346 256 346 C244 346 230 345 218 342 Z"
          fill={lip}
        />
        <path
          d="M221 344 C234 349 245 351 256 351 C267 351 278 349 291 344 C288 356 275 362 256 362 C237 362 224 356 221 344 Z"
          fill={lipLight}
        />
        <path
          d="M218 342 C236 347 276 347 294 342"
          stroke={lipDark}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="256" cy="356" rx="15" ry="3" fill="#fff" opacity=".08" />
        <path
          d="M216 339 C214 343 214 347 217 350"
          stroke={lipShadow}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M296 339 C298 343 298 347 295 350"
          stroke={lipShadow}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    )
  }

  if (value === 2) {
    return (
      <g>
        {defs}
        {shadow}
        <path
          d="M222 346 C234 340 246 338 254 342 C256 343 262 343 264 341 C272 336 284 338 292 342 C280 345 268 346 256 346 C244 346 232 346 222 346 Z"
          fill={lip}
        />
        <path
          d="M225 348 C238 352 247 353 256 353 C266 353 276 352 288 348 C286 358 274 363 256 363 C240 363 228 358 225 348 Z"
          fill={lipLight}
        />
        <path
          d="M222 346 C238 349 274 348 292 340"
          stroke={lipDark}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="256" cy="357" rx="14" ry="3" fill="#fff" opacity=".08" />
      </g>
    )
  }

  if (value === 3) {
    return (
      <g>
        {defs}
        {shadow}
        <path
          d="M220 342 C232 336 244 334 256 338 C268 334 280 336 292 342 C286 360 274 368 256 368 C238 368 226 360 220 342 Z"
          fill={lipDark}
        />
        <path
          d="M228 342 C240 338 272 338 284 342 C278 349 270 352 256 352 C242 352 234 349 228 342 Z"
          fill="#f7f1e6"
        />
        <path
          d="M228 342 C240 338 272 338 284 342 C282 344 280 345 278 346 C266 342 246 342 234 346 C232 345 230 344 228 342 Z"
          fill={lipShadow}
          opacity=".5"
        />
        <path
          d="M220 342 C232 336 244 334 256 338 C268 334 280 336 292 342"
          stroke={lipDark}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M226 355 C238 360 274 360 286 355"
          stroke={alpha(lipLight, 0.5)}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    )
  }

  if (value === 4) {
    return (
      <g>
        {defs}
        {shadow}
        <path
          d="M220 348 C232 343 244 342 252 345 C254 347 260 347 262 345 C270 342 282 343 292 348 C280 350 268 351 256 351 C244 351 232 350 220 348 Z"
          fill={lip}
        />
        <path
          d="M223 350 C236 354 246 355 256 355 C266 355 276 354 289 350 C286 360 274 365 256 365 C238 365 226 360 223 350 Z"
          fill={lipLight}
        />
        <path
          d="M219 351 C232 346 244 345 256 347 C268 345 280 346 293 351"
          stroke={lipDark}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="256" cy="359" rx="14" ry="3" fill="#fff" opacity=".07" />
      </g>
    )
  }

  if (value === 5) {
    return (
      <g>
        {defs}
        {shadow}
        <path
          d="M218 344 C230 337 243 335 251 341 C253 343 259 343 261 341 C269 335 282 337 294 344 C281 347 268 348 256 348 C244 348 231 347 218 344 Z"
          fill={lip}
        />
        <path
          d="M220 346 C234 351 245 353 256 353 C267 353 278 351 290 346 C289 359 275 367 256 367 C237 367 223 359 220 346 Z"
          fill={lipLight}
        />
        <path
          d="M218 344 C236 349 276 349 294 344"
          stroke={lipDark}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="256" cy="358" rx="17" ry="4" fill="#fff" opacity=".1" />
        <path
          d="M221 349 C234 354 246 356 256 356"
          stroke={alpha(lipDark, 0.22)}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    )
  }

  // Neutral
  return (
    <g>
      {defs}
      {shadow}
      <path
        d="M220 345 C230 338 242 336 250 341 C252 343 260 343 262 341 C270 336 282 338 292 345 C280 347 268 348 256 348 C244 348 232 347 220 345 Z"
        fill={lip}
      />
      <path
        d="M223 347 C236 351 246 352 256 352 C266 352 276 351 289 347 C286 357 274 363 256 363 C238 363 226 357 223 347 Z"
        fill={lipLight}
      />
      <path
        d="M220 345 C236 349 276 349 292 345"
        stroke={lipDark}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="256" cy="356" rx="14" ry="3" fill="#fff" opacity=".08" />
    </g>
  )
}
