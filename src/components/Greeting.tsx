import { Children } from "react"

type GreetingProps ={
    name?: string
    onClick?: (name: string) => void
    children?: React.ReactNode
}

export default function Greeting({name='익명',onClick,children}:GreetingProps){
    return(
        <div>
            <p>안녕하세요, {name}님 </p>
            <button onClick={() => onClick?.(name)}>인사하기</button>
            {Children && <div>{children}</div>}
        </div>
    )
}