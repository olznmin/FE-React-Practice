import type { User } from '../types'

type UserListProps = {
  users: User[]
  onRemove: (id: number) => void
}

export default function UserList({ users, onRemove }: UserListProps) {
  if (users.length === 0) return <p>사용자가 없습니다.</p>

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>
          {u.name} ({u.email})
          <button onClick={() => onRemove(u.id)}>삭제</button>
        </li>
      ))}
    </ul>
  )
}
