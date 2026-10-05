
import {type User} from "@/api"

interface HeaderProps {
  user: User | null
  onLogout: () => void
}

function Header({user, onLogout}: HeaderProps) {
  return (
    <header className="navbar">
      <div className="navbar-start">
        <h1 className="text-xl font-bold">Dobox</h1>
      </div>
      <div className="navbar-end">
        {user && <button className="btn btn-ghost btn-sm" onClick={onLogout}>Log Out</button>}
      </div>
    </header>
  )
}

export default Header
