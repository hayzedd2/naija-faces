# Naija Faces

A portrait mixer for Nigerian headwear, fabric, facial marks, and jewelry. Built with Vite, React, and TypeScript.

## Develop

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

The build also regenerates `api/face.js`, the bundled serverless renderer, from `server/face.ts`. Keep that generated file committed so Vercel always detects the function.

## Social image

`public/og.png` is the app's 1200×630 Open Graph image. Regenerate it after changing the face artwork:

```bash
bun run build:api
bun run build:og
```

It uses the split layout and the face code set in `scripts/build-og.mjs`.

## Face image API

Every face can be served as an image from its code:

```html
<img src="https://naija-faces.vercel.app/face/280010000000100000?format=svg&size=1024" alt="Naija face" />
```

### Parameters

| Name | Values | Default | Notes |
| --- | --- | --- | --- |
| `format` | `svg`, `png`, `jpg` | `svg` | `jpeg` also works. |
| `size` | `64`–`2048` | `1024` | Square output in pixels. |
| `background` | 6-digit hex, with or without `#` | face background | Optional solid background override. |

Examples:

```
/face/280011000000100000
/face/280011000000100000?format=png&size=2048
/face/280011000000100000?format=jpg&size=512&background=e7a3ad
```

Face codes come from the `face` query parameter in the app URL.

The handler lives in `server/face.ts` and is bundled to `api/face.js`. `vercel.json` rewrites `/face/:code` to `/api/face?code=:code`. During local development, the Vite dev server runs the same handler, so `/face/<code>` works at `http://localhost:5173` too.
