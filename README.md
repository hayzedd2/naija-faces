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

The endpoint is implemented in `api/face/[code].ts` and rewritten from `/face/:code` by `vercel.json`. During local development, the Vite dev server runs the same handler, so `/face/<code>` works at `http://localhost:5173` too.
