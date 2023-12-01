import { t } from "i18next"
import { Spinner } from "../include/Splash"
import { useState } from "react"
import classNames from "classnames"
import useAxios from "axios-hooks"
import { AuthSign } from "../../core/auth/Sign"

export type SignInProps = {
  onRefetch: () => {}
}

const SignIn: React.FC<SignInProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const [notice, setNotice] = useState("")
  const [{ loading }, axiosExecute] = useAxios(
    {
      url: "/users/signin",
      method: "POST"
    },
    { manual: true }
  )

  const signin = (event: any) => {
    const username = event.target.username.value
    const password = event.target.password.value

    event.preventDefault()
    axiosExecute({
      data: { username, password }
    })
      .then((res) => {
        if (!res.data || !res.data.accessToken || !res.data.refreshToken) {
          return setNotice(t("auth:signin.notice_failed_login"))
        }

        AuthSign.setAccessTokenStorage(res.data.accessToken)
        AuthSign.setRefreshTokenStorage(res.data.refreshToken)

        setNotice("")
        props.onRefetch()
      })
      .catch((err) => setNotice(t("auth:signin.notice_data_incorrect")))
  }

  return (
    <div className="signin-wrapper">
      <div className="signin-banner">
        <h1>{t("auth:signin.banner")}</h1>
      </div>
      <form action="#" onSubmit={signin}>
        {notice.length > 0 && (
          <div className="signin-notice">
            <span>{notice}</span>
          </div>
        )}
        <div className="signin-row">
          <label htmlFor="username">
            <span className="icomoon ic-auth-user signin-icon"></span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="signin-input"
            placeholder={t("auth:signin.username_placeholder")}
          />
        </div>
        <div className="signin-row">
          <label htmlFor="password">
            <span className="icomoon ic-auth-password signin-icon"></span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="signin-input"
            placeholder={t("auth:signin.password_placeholder")}
          />
        </div>
        <div className="signin-row">
          <button
            type="submit"
            className={classNames("signin-button", { logging: loading })}
          >
            {loading && <Spinner />}
            {!loading && <span>{t("auth:signin.button")}</span>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
