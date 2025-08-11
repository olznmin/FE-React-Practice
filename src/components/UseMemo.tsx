import { useMemo, useState } from 'react';

// 일부러 무겁게 만든 계산 (너무 느리면 SPINS 값을 줄여주세요)
const SPINS = 20_000_000;
function heavyCalc(num: number, spins = SPINS) {
  const t0 = performance.now();
  let acc = 0;
  for (let i = 0; i < spins; i++) {
    acc = (acc + i) % 1_000_000_007;
  }
  const out = acc + num * 2;
  const dt = (performance.now() - t0).toFixed(1);
  console.log(`heavyCalc(${num}) took ${dt}ms`);
  return out;
}

export default function UseMemoCompareHeavy() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ useMemo 안 쓰는 버전 — 매 렌더마다 heavyCalc 실행
  const normal = (() => {
    console.log('❌ normal 계산 실행');
    return heavyCalc(count);
  })();

  // ✅ useMemo 버전 — count가 변할 때만 heavyCalc 실행
  const memoed = useMemo(() => {
    console.log('✅ memo 계산 실행');
    return heavyCalc(count);
  }, [count]);

  return (
    <section>
      <h2>useMemo 비교 (heavyCalc 포함)</h2>

      <p>count: {count}</p>
      <p>일반 계산 결과: {normal}</p>
      <p>useMemo 계산 결과: {memoed}</p>

      <button onClick={() => setCount((c) => c + 1)}>count +1</button>
      <hr />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="다른 state 변경 (text)"
      />
      <p style={{ fontSize: 12 }}>
        * 콘솔을 열어 실행 로그와 소요 시간을 확인해 보세요.
      </p>
    </section>
  );
}
