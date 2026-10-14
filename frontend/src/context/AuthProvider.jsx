import { useCallback, useEffect, useMemo, useState } from 'react'
import api from '../lib/api'
import { AuthContext, TOKEN_KEY } from './AuthContext'

function hasStoredToken() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(hasStoredToken)

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // Token sudah tidak valid, abaikan.
    }
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  useEffect(() => {
    if (!hasStoredToken()) return

    let active = true

    api
      .get('/auth/me')
      .then((response) => {
        if (active) setUser(response.data.user)
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
      })
      .finally(() => {
        if (active) setInitializing(false)
      })

    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async ({ identifier, password, role }) => {
    const response = await api.post('/auth/login', {
      identifier,
      password,
      role,
    })

    localStorage.setItem(TOKEN_KEY, response.data.token)
    setUser(response.data.user)

    return response.data.user
  }, [])

  const value = useMemo(
    () => ({
      user,
      initializing,
      login,
      logout,
      isMahasiswa: user?.role === 'mahasiswa',
      isSatgas: user?.role === 'satgas',
    }),
    [user, initializing, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}