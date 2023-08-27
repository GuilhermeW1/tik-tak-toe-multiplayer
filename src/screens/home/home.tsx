import * as React from 'react'
import Header from '../../components/header'
import { useAuth } from '../../context/auth-provider'
import NoGames from '../../assets/noGame.svg'
import { ref, push, update } from 'firebase/database'
import { database } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'
import useRoom from '../../hooks/useRooms'

import Card from '../../components/card'

function Home() {
  const rooms = useRoom()
  const { user, logout } = useAuth()
  const [newRoom, setNewRoom] = React.useState('')
  const [joinRoom, setJoinRoom] = React.useState('')
  const history = useNavigate()

  async function handleCreateRoom(event: React.FormEvent) {
    event.preventDefault()

    const dbRef = ref(database, 'rooms')

    const firebaseRoom = await push(dbRef, {
      title: newRoom,
      mainPlayer: user,
      secondPlayer: '',
      squares: Array(9).fill(''),
    })

    history(`/rooms/${firebaseRoom.key}`)
  }

  //fazer validacao de sala e verificar se a sala existe
  async function handleJoinRoom(event: React.FormEvent) {
    event.preventDefault()

    const dbRef = ref(database, `rooms/${joinRoom}`)

    await update(dbRef, { secondPlayer: user })
    history(`/rooms/${joinRoom}`)
  }

  return (
    <>
      <Header user={user} logout={logout} />
      <div className="flex flex-row items-center justify-evenly  h-screen p-10 bg-slate-50">
        <aside className="w-1/2 h-full flex items-center justify-center">
          <div
            className={`flex flex-col gap-3 overflow-auto max-h-screen flex-1 ${
              rooms.length > 0 ? 'pt-[100px]' : ''
            }`}
          >
            {rooms.length > 0 && rooms ? (
              <div className='flex flex-col gap-4'>
                <h1 className='mb-4 self-center text-2xl'>Salas disponiveis</h1>
              {rooms.map(item => {
                return <Card item={item} key={item.id} />
              })}
              </div>
            ) : (
              <>
                <h2>Parece que nao a nenhuma sala criada!</h2>
                <br />
                <h3>Que tal criar a sua?</h3>
                <img
                  src={NoGames}
                  alt="game-ilustration"
                  className="h-64 w-full"
                />
              </>
            )}
          </div>
        </aside>

        <main className="flex flex-col gap-3 shadow-2xl p-10 rounded m-2">
          <h4 className="font-medium">Crie sua sala !!</h4>

          <form className="flex flex-col gap-2" onSubmit={handleCreateRoom}>
            <label className="self-center">Nome da sala</label>
            <input
              type="text"
              className="rounded p-2 border-solid border-purple-300 border-2"
              placeholder="minha sala"
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <button
              type="submit"
              className="p-2 rounded bg-purple-600 hover:bg-purple-500"
            >
              Create Room
            </button>
          </form>

          <hr />

          <form className="flex flex-col pt-3 gap-2" onSubmit={handleJoinRoom}>
            <span className="self-center">
              Entre utilizando o codigo da sala
            </span>
            <input
              type="text"
              className="rounded p-1 border-solid border-purple-300 border-2"
              placeholder="room Id"
              value={joinRoom}
              onChange={event => setJoinRoom(event.target.value)}
            />
            <button
              type="submit"
              className="p-1 rounded bg-violet-400 hover:bg-purple-500"
            >
              Join Room
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export default Home
