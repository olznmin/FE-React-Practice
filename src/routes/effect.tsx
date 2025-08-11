import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import EffectDemo from '../components/EffectDemo'

export const effectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/effect',
  component: () => <EffectDemo />,
})
