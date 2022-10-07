import * as React from 'react'
import { RoomWitIdType } from '../hooks/useRooms'
import { useAuth } from '../context/auth-provider'
import { useNavigate } from 'react-router-dom'
import { database } from '../services/firebase'
import { ref, update } from 'firebase/database'

type CardPropsType = {
  item: RoomWitIdType
}

function Card({ item }: CardPropsType) {
  const history = useNavigate()
  const { user } = useAuth()

  //precisa validar se o jogador ja nao esta na sala e fazer uma logica para isso urgente
  async function handleJoinRoomCard(room: RoomWitIdType) {
    //this validation prevent some user to get in the room two
    if (
      room.mainPlayer?.id === user?.id ||
      room.secondPlayer?.id === user?.id
    ) {
      history(`/rooms/${room.id}`)
      return
    }

    const dbRef = ref(database, `rooms/${room.id}`)
    await update(dbRef, { secondPlayer: user })
    history(`/rooms/${room.id}`)
  }

  return (
    <div
      key={item.id}
      className="rounded p-2 border-solid border-purple-300 border-2 h-[150px] flex flex-row gap-2 justify-between "
    >
      <div className="flex flex-col gap-2">
        <span className="self-center">{item.title}</span>
        <span>Players:</span>
        <div>{item.mainPlayer?.name}</div>
        <div>{item.secondPlayer?.name}</div>
      </div>
      <div className="w-[120px]">
        {typeof item.secondPlayer === 'object' ? (
          <>
            <span>sala cheia</span>
            {item.mainPlayer.id === user?.id ||
            item.secondPlayer?.id === user?.id ? (
              <button
                onClick={() => handleJoinRoomCard(item)}
                className="rounded p-2 border-solid border-purple-300 border-2 mt-3"
              >
                Join Room Back
              </button>
            ) : null}
          </>
        ) : (
          <div>
            <span>A espera de jogadores</span>
            <button
              onClick={() => handleJoinRoomCard(item)}
              className="rounded p-2 border-solid border-purple-300 border-2 mt-3"
            >
              {item.mainPlayer.id === user?.id ? 'Join Room Back' : 'Join Room'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
