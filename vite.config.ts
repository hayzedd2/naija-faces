import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

/**
 * Serve `/face/<code>` locally through the same handler Vercel runs in production.
 * Production uses the `vercel.json` rewrite; Vite has no `api/` routes of its own.
 */
function faceApiDev(): Plugin {
  return {
    name: 'face-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url ?? '').split('?')[0]
        if (!pathname.startsWith('/face/')) return next()

        try {
          const module = await server.ssrLoadModule('/server/face.ts')
          await module.default(req, res)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

/**
 * Serve `/docs` as `/docs/` in development so the path matches production.
 */
function docsDev(): Plugin {
  return {
    name: 'docs-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/docs' || req.url?.startsWith('/docs?')) {
          req.url = req.url.replace(/^\/docs/, '/docs/')
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), faceApiDev(), docsDev()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        docs: fileURLToPath(new URL('./docs/index.html', import.meta.url)),
      },
    },
  },
})
