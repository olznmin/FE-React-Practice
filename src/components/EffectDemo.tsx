import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

type VersionInfo = {
  version: string
  server: string
  time_utc: string
}

export default function EffectDemo() {
  const [data, setData] = useState<VersionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        // 직접 호출 (CORS 허용 필요). 프록시 쓰면 '/api/version'으로 변경
        const { data } = await axios.get<VersionInfo>('http://localhost:8000/version', {
          signal: controller.signal,
        })
        setData(data)
      } catch (err) {
        // AbortController 취소는 에러로 표시하지 않음
        const anyErr = err as any
        if (axios.isCancel?.(anyErr) || anyErr?.code === 'ERR_CANCELED' || anyErr?.name === 'CanceledError') {
          // 요청이 취소됨(라우트 전환/StrictMode 등) → 무시
          return
        }

        const axErr = err as AxiosError
        // HTTP 에러면 상태코드 표시, 아니면 일반 메시지
        if (axErr.response) {
          setError(`HTTP ${axErr.response.status}`)
        } else {
          setError(axErr.message || String(err))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <h2>EffectDemo (Axios)</h2>
      {loading && <p>로딩 중...</p>}
      {!loading && error && <p>에러: {error}</p>}
      {!loading && !error && data && (
        <ul>
          <li>버전: {data.version}</li>
          <li>서버: {data.server}</li>
          <li>시간(UTC): {data.time_utc}</li>
        </ul>
      )}
    </section>
  )
}
