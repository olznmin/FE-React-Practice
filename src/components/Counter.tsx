import { useState } from "react";

type CounterProps ={
    inital?: number
    step?: number
}

export default function Counter({inital=0 , step =1}:CounterProps){
    const [count, setCount] = useState<number>(inital)

    const inc = () => setCount(c=> c+step)
    const dec = () => setCount(c=> c-step)
    const reset = () => setCount(inital)

    return(
        <div>
            <div>count: {count}</div>
            <button onClick={inc}>+{step}</button>
            <button onClick={dec}>+{step}</button>
            <button onClick={reset}>reset</button>
            
        </div>
    )
}