// src/router.tsx
import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { effectRoute } from './routes/effect'
import { usememoRoute } from './routes/usememo'
import { tableRoute } from './routes/table'
import { usequeryRoute } from './routes/usequery'
import { usesuspensequeryRoute } from './routes/usesuspensequery'

const routeTree = rootRoute.addChildren([
  indexRoute,
  effectRoute,
  usememoRoute,
  tableRoute,
  usequeryRoute,
  usesuspensequeryRoute
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
