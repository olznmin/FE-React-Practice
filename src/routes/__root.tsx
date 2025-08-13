// src/routes/__root.tsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const rootRoute = createRootRoute({
  component: () => (
    <div>
      <nav style={{ marginBottom: 16 }}>
        <Link to="/">Home</Link> {' | '}
        <Link to="/effect">Effect</Link> {' | '}
        <Link to="/usememo">UseMemo</Link> {' | '}
        <Link to="/table">Table</Link>{' | '}
        <Link to="/usequery">useQuery</Link>{' | '}
        <Link to="/usesuspensequery">useQuery</Link>
      </nav>
      <Outlet />
    </div>
  ),
})
