// src/features/version/UseQuery.tsx
import React from 'react'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

// 모듈 스코프에 한 번만 생성 (재렌더링 시 재생성 방지)
const queryClient = new QueryClient()

function VersionView() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['version'],
    // React Query v5: queryFn 컨텍스트에서 signal 제공 → axios에 전달
    queryFn: async ({ signal }) => {
      const res = await axios.get('http://localhost:8000/version', { signal })
      return res.data
    },
    staleTime: 60_000, // 선택: 1분 동안 신선 데이터로 간주
  })

  if (isLoading) return <div>로딩중...</div>
  if (isError) return <div>에러가 발생했습니다: {(error as Error)?.message}</div>

  return (
    <div>
      <h2>Zustand: Use Query </h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

// 한 파일 안에서 Provider까지 포함한 통합 컴포넌트
export default function UseQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <VersionView />
    </QueryClientProvider>
  )
}
