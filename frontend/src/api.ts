import axios from "axios"
import { Sign } from "./components/auth/Sign"

let retryRefreshToken = false

axios.defaults.baseURL = "http://192.168.31.200:3030"
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  (config) => {
    if (config.url !== "/users/refresh") {
      config.headers.Authorization = "Bearer " + Sign.getAccessTokenStorage() || ""
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
      const refreshTokenStorage = Sign.getRefreshTokenStorage()

      if (err.response.status === 401 && refreshTokenStorage && !retryRefreshToken) {
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
          Sign.setAccessTokenStorage(accessToken)
          Sign.setRefreshTokenStorage(refreshToken)
          return axios(originalConfig)
        } catch (error) {
          Sign.removeAccessTokenStorage()
          Sign.removeRefreshTokenStorage()
          return Promise.reject(error)
        }
      }
    }

    return Promise.reject(err)
  }
)
