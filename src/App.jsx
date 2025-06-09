
import { useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import './App.css'

// Firebase konfiguracija - ovo je demo, pravi projekt koristi zaseban key
const firebaseConfig = {
  apiKey: "AIzaSyB5QFlE5hyvY3MvQGn7haVzTCFQ9m-bdUQ",
  authDomain: "ciux-demo-auth.firebaseapp.com",
  projectId: "ciux-demo-auth",
  storageBucket: "ciux-demo-auth.firebasestorage.app",
  messagingSenderId: "1047690973153",
  appId: "1:1047690973153:web:741cd73d8a439ea10f4ca0"
}

// Inicijalizacija Firebase aplikacije
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setStatus('Login successful!')
        setLoggedIn(true)
      })
      .catch(error => {
        setStatus('Error: ' + error.message)
      })
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      setStatus('Logged out.')
      setLoggedIn(false)
    })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Ciux Demo Login</h2>
      {!loggedIn ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /><br />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <p>{status}</p>
    </div>
  )
}

export default App
