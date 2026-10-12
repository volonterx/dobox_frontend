import {useAuth} from "@/auth/useAuth";
import {useBack} from "@/hooks/useBackTo";
import {useNavigate} from "react-router";



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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
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
