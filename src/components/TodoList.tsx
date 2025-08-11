import { useMemo, useState } from 'react'
import type { Todo } from '../types'; // ← 여기! type-only import

type TodoListProps = {
  todos: Todo[]
  onAdd: (title: string) => void
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export default function TodoList({ todos, onAdd, onToggle, onRemove }: TodoListProps) {
  const [text, setText] = useState('')

  const doneCount = useMemo(() => todos.filter(t => t.done).length, [todos])

  const submit = () => {
    onAdd(text)
    setText('')
  }

  return (
    <div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일" />
        <button onClick={submit}>추가</button>
      </div>

      {todos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map(t => (
            <li key={t.id}>
              <label>
                <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} />
                {t.title}
              </label>
              <button onClick={() => onRemove(t.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}


      <div>완료: {doneCount} / 전체: {todos.length}</div>
    </div>
  )
}
