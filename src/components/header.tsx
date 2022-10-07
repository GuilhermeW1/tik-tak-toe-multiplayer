import * as React from 'react'
import { UserType } from '../context/auth-provider'
import { useNavigate } from 'react-router-dom'

type HeaderType = {
  user: UserType | undefined
  logout: () => void
}

function Header({ user, logout }: HeaderType) {
  const history = useNavigate()

  const handleNavigateToHome = (): void => {
    history('/')
  }

  return (
    <header className="flex flex-row justify-between h-20 bg-purple-400 items-center px-10 font-medium fixed top-0 right-0 left-0">
      <div>
        <button onClick={handleNavigateToHome}>Tik-tak-toe</button>
      </div>
      <div className="flex flex-row justify-between w-[300px] h-full items-center">
        <span>{user?.name}</span>
        <button
          onClick={logout}
          className="cursor-pointer h-full px-3 hover:bg-purple-500"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
