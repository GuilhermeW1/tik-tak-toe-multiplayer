import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import * as React from 'react'
import { auth } from '../services/firebase'

type UserType = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: UserType | undefined
  signInWithGoogle: () => void
  logout: () => void
}

type AuthProviderType = {
  children: React.ReactNode
}

const AuthContext = React.createContext({} as AuthContextType)
AuthContext.displayName = 'AuthContext'

function AuthProvider(props: AuthProviderType) {
  const [user, setUser] = React.useState<UserType>()

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing infromation from google acount.')
        }

        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information')
      }

      setUser({
        id: uid,
        avatar: photoURL,
        name: displayName,
      })
    }
  }

  async function logout() {
    await auth.signOut()
    setUser(undefined)
  }

  const value = { user, signInWithGoogle, logout }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth have to been wrapped in auth provider')
  }
  return context
}

export { AuthProvider, useAuth }
export type { UserType }
