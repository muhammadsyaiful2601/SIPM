import { createContext, useContext } from 'react'

export { TOKEN_KEY } from '../lib/tokenStorage'

export const AuthContext = createContext(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider.')
  }

  return context
}