import * as React from 'react'
import { database } from '../services/firebase'
import { ref, onValue, off, update } from 'firebase/database'
import { useAuth } from '../context/auth-provider'
import { UserType } from '../context/auth-provider'

interface BoardType {
  roomId: string
}

type CalculateStatusType = {
  winner: string
  squares: string[]
  nextValue: 'X' | 'O'
}

interface FirebaseValues extends PlayersType {
  squares: string[]
  title: string
}

interface PlayersType {
  mainPlayer: UserType
  secondPlayer: UserType
}

function Board({ roomId }: BoardType) {
  const { user } = useAuth()
  const [squares, setSquares] = React.useState<string[]>(Array(9).fill(''))
  const [players, setPlayers] = React.useState<PlayersType>({} as PlayersType)

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus({ winner, squares, nextValue })

  React.useEffect(() => {
    const query = ref(database, `rooms/${roomId}`)

    onValue(query, snapshot => {
      const databaseValues: FirebaseValues = snapshot.val()

      setSquares(databaseValues.squares ?? [])
      setPlayers({
        mainPlayer: databaseValues.mainPlayer,
        secondPlayer: databaseValues.secondPlayer,
      })
    })

    return () => {
      off(query)
    }
  }, [roomId])

  async function selectSquare(square: number) {
    const { mainPlayer, secondPlayer } = players
    if (winner || squares[square]) {
      return
    }

    if (
      (user?.id !== mainPlayer.id && nextValue === 'X') ||
      (user?.id !== secondPlayer.id && nextValue === 'O')
    ) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue

    const dbRef = ref(database, `rooms/${roomId}`)

    await update(dbRef, { squares: squaresCopy })
  }

  async function restartGame() {
    //setTogglePlayerSide(!togglePlayerSide)
    const dbRef = ref(database, `rooms/${roomId}`)

    await update(dbRef, { squares: Array(9).fill('') })
  }

  function renderSquare(index: number) {
    return (
      <button
        className="border-solid border-purple-300 border w-20 h-20 float-left"
        onClick={() => selectSquare(index)}
      >
        {squares[index]}
      </button>
    )
  }

  return (
    <div className="flex flex-col ">
      <div className="status">{status} </div>
      <div className="row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <button className="restart" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  )
}

//isso pode dar erro por conta do boolean
function calculateNextValue(squares: string[]): 'X' | 'O' {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares: string[]): string {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return ''
}

function calculateStatus({ winner, squares, nextValue }: CalculateStatusType) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

export default Board
