import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import UseMemo from '../components/UseMemo' // 실제 파일명/대소문자에 맞게!

export const usememoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/usememo',
  component: () => <UseMemo />,
})
