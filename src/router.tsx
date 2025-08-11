// src/router.tsx
import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { effectRoute } from './routes/effect'
import { usememoRoute } from './routes/usememo'

const routeTree = rootRoute.addChildren([
  indexRoute,
  effectRoute,
  usememoRoute                                          // ✅ 이 줄
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
