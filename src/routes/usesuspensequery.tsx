// src/routes/typepractice.tsx
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import UseSuspensequery from '../components/UseSuspensequery'

export const usesuspensequeryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/usesuspensequery',
  component: () => <UseSuspensequery />,
})
