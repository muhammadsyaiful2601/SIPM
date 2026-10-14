import { useCallback, useEffect, useMemo, useState } from 'react'
import api from '../lib/api'
import { clearToken, readToken, writeToken } from '../lib/tokenStorage'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(() =>
    Boolean(readToken()),
  )

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // Token sudah tidak valid, abaikan.
    }
    clearToken()
    setUser(null)
  }, [])

  useEffect(() => {
    if (!readToken()) return

    let active = true

    api
      .get('/auth/me')
      .then((response) => {
        if (active) setUser(response.data.user)
      })
      .catch(() => {
        clearToken()
      })
      .finally(() => {
        if (active) setInitializing(false)
      })

    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async ({ identifier, password, role, remember }) => {
    const response = await api.post('/auth/login', {
      identifier,
      password,
      role,
      remember: Boolean(remember),
    })

    writeToken(response.data.token, remember)
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