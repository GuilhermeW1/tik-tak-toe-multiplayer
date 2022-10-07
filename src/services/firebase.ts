import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJs9fgFBvsLolRFDQTxQIlXJLdzFHgBlA',
  authDomain: 'tik-tak-toe-3d416.firebaseapp.com',
  databaseURL: 'https://tik-tak-toe-3d416-default-rtdb.firebaseio.com',
  projectId: 'tik-tak-toe-3d416',
  storageBucket: 'tik-tak-toe-3d416.appspot.com',
  messagingSenderId: '948451340342',
  appId: '1:948451340342:web:af73d94e54cfbb1d95e897',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const database = getDatabase(app)

export { app, auth, database }
