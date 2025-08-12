import { useState, useMemo } from "react";

export default function SimpleUseMemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // count가 바뀔 때만 계산
  const doubled = useMemo(() => {
    console.log("📌 doubled 계산 실행됨");
    return count * 2;
  }, [count]);

  const doubledNormal = (() => {
    console.log("❌ doubledNormal 계산 실행됨");
    return count * 2;
  })();


  return (
    <section>
      <h2>Simple useMemo Demo</h2>
      <p>count: {count}</p>
      <p>doubled: {doubled}</p>
      <p>doubledNormal: {doubledNormal}</p>

      <button onClick={() => setCount((c) => c + 1)}>count +1</button>
      <hr />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="다른 state 변경"
      />
    </section>
  );
}
