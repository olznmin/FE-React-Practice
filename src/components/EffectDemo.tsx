import { useEffect, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios'

type VersionInfo = {
  version: string
  server: string
  time_utc: string
}

export default function EffectDemo() {
  const [data, setData] = useState<VersionInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ⬇️ 수동 새로고침 트리거용 (값이 바뀌면 effect 재실행)
  const [refreshIndex, setRefreshIndex] = useState(0)

  // ⬇️ 자동 새로고침
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [intervalMs, setIntervalMs] = useState(5000)

  // ⬇️ 마지막 갱신 시각
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // ⬇️ 현재 진행 중인 요청 취소를 위해 controller를 보관
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    controllerRef.current = controller

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        // 프록시 사용 시 '/api/version' 으로 변경 가능
        const { data } = await axios.get<VersionInfo>('http://localhost:8000/version', {
          signal: controller.signal,
          timeout: 8000, // ⬅️ 타임아웃 추가(8s)
        })
        setData(data)
        setLastUpdated(new Date().toLocaleString())
      } catch (err) {
        // 취소/StrictMode 재마운트 취소는 무시
        if (axios.isCancel(err) || (err as any)?.name === 'CanceledError') return
        const axErr = err as AxiosError
        setError(axErr.response ? `HTTP ${axErr.response.status}` : axErr.message || String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // ⬇️ 언마운트 or 다음 요청 전에 취소
    return () => {
      controller.abort()
      controllerRef.current = null
    }
  }, [refreshIndex]) // 수동/자동 새로고침 시 재실행

  // ⬇️ 자동 새로고침 토글/주기 관리
  useEffect(() => {
    if (!autoRefresh) return
    const id = setInterval(() => setRefreshIndex((i) => i + 1), intervalMs)
    return () => clearInterval(id)
  }, [autoRefresh, intervalMs])

  // ⬇️ 수동 새로고침
  const handleRefresh = () => setRefreshIndex((i) => i + 1)

  // ⬇️ 진행 중인 요청 취소
  const handleCancel = () => controllerRef.current?.abort()

  return (
    <section>
      <h2>EffectDemo (Axios) — 실전 패턴 추가</h2>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        <button onClick={handleRefresh} disabled={loading}>새로고침</button>
        <button onClick={() => setAutoRefresh((v) => !v)}>
          자동 새로고침: {autoRefresh ? 'ON' : 'OFF'}
        </button>
        <label>
          주기(ms):{' '}
          <input
            type="number"
            value={intervalMs}
            min={1000}
            step={500}
            onChange={(e) => setIntervalMs(Number(e.target.value))}
            style={{ width: 100 }}
          />
        </label>
        <button onClick={handleCancel} disabled={!loading}>요청 취소</button>
      </div>

      <div style={{ marginBottom: 8, fontSize: 12, opacity: 0.8 }}>
        {lastUpdated ? `마지막 갱신: ${lastUpdated}` : '아직 갱신 이력 없음'}
      </div>

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
