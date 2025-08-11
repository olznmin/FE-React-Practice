import { useState } from 'react'
import type { User } from '../types'

type UserFormProps = {
  onSubmit: (u: Omit<User, 'id'>) => void
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const submit = () => {
    if (!name.trim() || !email.trim()) return
    onSubmit({ name: name.trim(), email: email.trim() })
    setName('')
    setEmail('')
  }

  return (
    <div>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      </div>
      <div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
      </div>
      <button onClick={submit}>추가</button>
    </div>
  )
}
