export namespace Sign {
  const ACCESS_TOKEN_KEY = "access_token"
  const REFRESH_TOKEN_KEY = "refresh_token"

  export function setAccessTokenStorage(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  }

  export function getAccessTokenStorage() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  export function setRefreshTokenStorage(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  }

  export function getRefreshTokenStorage() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }

  export function removeAccessTokenStorage() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  export function removeRefreshTokenStorage() {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}
