import './App.css'
import {type User, fetchMe, logOut} from "./api"
import TodoPage from './TodoPage'
import LoginPage from './LoginPage'
import {useState, useEffect} from "react";
import Header from './components/layout/Header'


function App() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    fetchMe().then(setUser).finally(() => setAuthLoading(false))
  }, [])

  function userLogOut() {
    logOut();
    setUser(null)
  }


  if (authLoading) return <span className="loading loading-spinner mx-auto mt-16 block" />

  return (
    <div className="mx-auto max-w-lg p-4">
      <Header user={user} onLogout={() => userLogOut()}/>
      {user ? <TodoPage/> : <LoginPage/>}
    </div>
  )
}

export default App
