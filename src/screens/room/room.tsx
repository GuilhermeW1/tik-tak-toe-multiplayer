import * as React from 'react'
import { useParams } from 'react-router-dom'
import Board from '../../components/game-board'
import Header from '../../components/header'
import { useAuth } from '../../context/auth-provider'
import { database } from '../../services/firebase'
import { remove, ref } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

type RoomParamsType = {
  id: string
}

function Room() {
  const { user, logout } = useAuth()
  const params = useParams<RoomParamsType>()
  const roomId = params.id !== undefined ? params.id : ''
  const history = useNavigate()

  async function handleCloseRoom(roomId: string) {
    const roomRef = ref(database, `rooms/${roomId}`)
    await remove(roomRef)
    history('/')
  }

  return (
    <>
      <Header user={user} logout={logout} />
      <main className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="flex flex-col self-end pr-12">
          <span>Codigo da sala</span>
          {roomId}
          <button onClick={() => handleCloseRoom(roomId)}>Close room</button>
        </div>

        <Board roomId={roomId} />
      </main>
    </>
  )
}

export default Room
