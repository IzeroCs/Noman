import { t } from "i18next"
import { Spinner } from "../include/Splash"
import { useState } from "react"
import classNames from "classnames"
import useAxios from "axios-hooks"

export type SignInProps = {}

const SignIn: React.FC<SignInProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const [{ data, response, loading, error }, axiosExec] = useAxios(
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
    axiosExec({
      data: { username, password }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {})
  }

  return (
    <div className="signin-wrapper">
      <div className="signin-banner">
        <h1>{t("auth:signin.banner")}</h1>
      </div>
      <form action="#" onSubmit={signin}>
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
