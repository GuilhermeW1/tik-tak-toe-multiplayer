import React, { FormEvent } from 'react'
import GameSvg from './assets/game.svg'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/auth-provider'

function UnauthenticatedApp() {
  const history = useNavigate()

  const roomRef = React.useRef<HTMLInputElement>(null)
  const [isValidRoom, setIsValidRoom] = React.useState(false)

  const { user, signInWithGoogle } = useAuth()

  //here is make a verification if a room exists and then enter in
  function handleJoinRoomForm(event: FormEvent) {
    event.preventDefault()
    const roomValue = roomRef.current?.valueAsDate as unknown as string

    if (!roomValue) {
      setIsValidRoom(true)
    }

    //implemnet the validations of if the room exist and then join in or reject
    //and give some error or
  }

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle()
    }
    history('/')
  }

  return (
    <div className="flex flex-row items-center justify-evenly  h-screen p-10 bg-slate-50">
      <aside className="w-1/2">
        <img src={GameSvg} alt="game-ilustration" />
      </aside>
      <main className="flex flex-col gap-3 shadow-2xl p-10 rounded m-2">
        <button
          className="p-4 rounded border-violet-500 border-2   flex flex-row items-center justify-evenly"
          onClick={handleLogin}
        >
          Start playing with google
          <FcGoogle size={24} />
        </button>
        <span className="pt-6">Ou entre em uma sala com o codigo dela</span>
        <hr />
        <form
          onSubmit={handleJoinRoomForm}
          className="flex flex-col pt-3 gap-2"
        >
          {isValidRoom ? (
            <span className="text-red-600">Sala incorreta</span>
          ) : null}
          <input
            type="text"
            className="rounded p-3 border-solid border-purple-300 border-2"
            placeholder="room Id"
            ref={roomRef}
          />
          <button
            type="submit"
            className="p-3 rounded bg-purple-600 hover:bg-purple-500"
          >
            Join Room
          </button>
        </form>
      </main>
    </div>
  )
}

export default UnauthenticatedApp
