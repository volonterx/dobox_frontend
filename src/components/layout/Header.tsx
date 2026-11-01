import {useAuth} from "@/auth/useAuth";
import {useBack} from "@/hooks/useBackTo";
import {useNavigate} from "react-router";
import BackIcon from "@/components/icons/BackIcon";



function Header() {

  const navigate = useNavigate()

  const { user, logout } = useAuth()
  const back = useBack()

  return (
    <header className="navbar fixed inset-x-0 top-0 z-20 mx-auto max-w-lg bg-transparent px-6">
      <div className="navbar-start">
        {back && (
            <button
              aria-label="Go back"
              className="btn btn-ghost btn-circle mr-1"
              onClick={() => (back.onBack ? back.onBack() : navigate(back.to))}
            >
            <BackIcon />
          </button>
        )}
        <h1 className="text-xl font-bold cursor-pointer"
            onClick={() => navigate('/')}
        >
          Dobox
        </h1>
      </div>
      <div className="navbar-end">
        {user && (
          <button className="btn btn-ghost btn-circle text-xl" onClick={logout} aria-label="Log out" title="Log out">
            ➜]
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
