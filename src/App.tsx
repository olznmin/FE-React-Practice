import './App.css'
import type { Todo, User } from './types'; // ← 여기! type-only import
import Counter from './components/Counter'
import Greeting from './components/Greeting'
import TodoList from './components/TodoList'
import UserForm from './components/UserForm';
import { useState } from 'react'
import UserList from './components/UserList';

function App() {  
  const [todos, setTodos] = useState<Todo[]>([
          { id: 1, title: 'React+TS 연습 시작', done: true },
          { id: 2, title: '상태/이벤트 익히기', done: false },
        ])


  // Section 3 
  const addTodo = (title: string) => {
    if (!title.trim()) return
    setTodos(prev => [...prev, { id: Date.now(), title: title.trim(), done: false }])
  }
  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }
  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  // Section4
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Lee', email: 'lee@example.com' },
  ])

  const addUser = (u: Omit<User, 'id'>) => {
    setUsers(prev => [...prev, { id: Date.now(), ...u }])
  }

    const removeUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <>
      <div>
        <h1>
          React + TypeScript
        </h1>

        <section>
          <h2>Section 1: Props</h2>
          <Greeting name="재민" onClick={(n) => alert(`${n}님 반가워요!`)}></Greeting>
        </section>

        <section>
          <h2> Section 2: State </h2>
          <Counter inital={0} step={1}/>
        </section>

        <section>
          <h2> Section 3 : 리스트 & key & 파생값</h2>
          <TodoList todos={todos} onAdd={addTodo} onToggle={toggleTodo} onRemove={removeTodo} />
        </section>

        <section>
        <h2> Section 4: 폼(Controlled) & 상태 끌어올리기</h2>
        <UserForm onSubmit={addUser} />
        <UserList users={users} onRemove={removeUser}/>
      </section>

      </div>
    </>
  )
}

export default App
