import SignIn from "./SignIn"

export type AuthProps = {}

const Auth: React.FC<AuthProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div className="auth-wrapper">
      <SignIn />
    </div>
  )
}

export default Auth
