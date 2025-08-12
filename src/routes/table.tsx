// src/routes/typepractice.tsx
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import Type from '../components/Table'

export const tableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/table',
  component: () => <Type />,
})
