import axios from "axios"
import { AuthSign } from "./core/auth/Sign"

let retryRefreshToken = false

axios.defaults.baseURL = "http://192.168.31.200:3030"
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  (config) => {
    if (config.url !== "/users/refresh") {
      config.headers.Authorization =
        "Bearer " + AuthSign.getAccessTokenStorage() || ""
    }
    return config
  },
  (err) => Promise.reject(err)
)

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config

    if (originalConfig.url !== "/users/signin" && err.response) {
      const refreshTokenStorage = AuthSign.getRefreshTokenStorage()

      if (
        err.response.status === 401 &&
        refreshTokenStorage &&
        !retryRefreshToken
      ) {
        retryRefreshToken = true

        try {
          const refresh = await axios.get("/users/refresh", {
            headers: {
              Authorization: "Bearer " + refreshTokenStorage
            }
          })

          const { accessToken, refreshToken } = refresh.data

          if (!accessToken || !refreshToken) {
            return Promise.reject()
          }

          retryRefreshToken = false
          AuthSign.setAccessTokenStorage(accessToken)
          AuthSign.setRefreshTokenStorage(refreshToken)
          return axios(originalConfig)
        } catch (error) {
          AuthSign.removeAccessTokenStorage()
          AuthSign.removeRefreshTokenStorage()
          return Promise.reject(error)
        }
      }
    }

    return Promise.reject(err)
  }
)
