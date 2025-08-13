// src/features/version/UseSuspensequery.tsx
import { Suspense } from 'react'
import axios from 'axios'
import {
  QueryClient,
  QueryClientProvider,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient()

function Loading() {
  return <div>로딩중...</div>
}

function ErrorFallback({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.'
  return <div>에러가 발생했습니다: {message}</div>
}

function VersionView() {
  const { data } = useSuspenseQuery({
    queryKey: ['version'],
    queryFn: async ({ signal }) => {
      const res = await axios.get('http://localhost:8000/version', { signal })
      return res.data
    },
    staleTime: 60_000,
  })

  return (
    <div>
      <h2>Suspense: Version</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default function UseSuspensequery() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallbackRender={({ error }: { error: unknown }) => (
          <ErrorFallback error={error} />
        )}
      >
        <Suspense fallback={<Loading />}>
          <VersionView />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}
