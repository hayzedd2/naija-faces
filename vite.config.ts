import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

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

export default defineConfig({
  plugins: [react(), faceApiDev()],
})
