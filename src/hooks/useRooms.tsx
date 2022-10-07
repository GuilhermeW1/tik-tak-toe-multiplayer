import * as React from 'react'
import { database } from '../services/firebase'
import { ref, onValue, off } from 'firebase/database'
import { UserType } from '../context/auth-provider'

type RoomsType = Record<
  string,
  {
    mainPlayer: UserType
    secondPlayer: UserType
    title: string
  }
>

type RoomWitIdType = {
  id: string
  mainPlayer: UserType
  secondPlayer: UserType
  title: string
}

//aqui no room eu nao passei os squares por enquanto
function useRoom(): RoomWitIdType[] {
  const [rooms, setRooms] = React.useState<RoomWitIdType[]>([])

  React.useEffect(() => {
    const dbRef = ref(database, 'rooms')

    onValue(dbRef, snapshot => {
      const databaseRooms = snapshot.val()
      console.log(databaseRooms)
      const firebaseRooms: RoomsType = databaseRooms ?? {}

      const parsedRooms = Object.entries(firebaseRooms).map(([key, value]) => {
        return {
          id: key,
          mainPlayer: value.mainPlayer,
          secondPlayer: value.secondPlayer,
          title: value.title,
        }
      })
      setRooms(parsedRooms as RoomWitIdType[])
    })

    return () => {
      off(dbRef)
    }
  }, [])

  return rooms
}

export default useRoom
export type { RoomWitIdType }
