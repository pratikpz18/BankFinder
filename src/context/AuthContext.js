import React, { useContext, useState, useEffect } from "react"
import fire from "../config/firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function login(email, password) {
    return fire.auth().signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return fire.auth().signOut()
  }

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout,
  }
  console.log(value)

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}