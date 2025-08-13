// src/routes/typepractice.tsx
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import UseQuery from '../components/UseQuery'

export const usequeryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/usequery',
  component: () => <UseQuery />,
})
