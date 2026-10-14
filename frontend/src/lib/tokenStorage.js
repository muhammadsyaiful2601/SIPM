export const TOKEN_KEY = 'sipm_token'

export function readToken() {
  return (
    window.localStorage.getItem(TOKEN_KEY) ??
    window.sessionStorage.getItem(TOKEN_KEY)
  )
}

export function writeToken(token, remember) {
  const store = remember ? window.localStorage : window.sessionStorage
  const other = remember ? window.sessionStorage : window.localStorage

  other.removeItem(TOKEN_KEY)
  store.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.sessionStorage.removeItem(TOKEN_KEY)
}