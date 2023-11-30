import SignIn from "./SignIn"

export type AuthProps = {
  onRefetch: () => {}
}

const Auth: React.FC<AuthProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div className="auth-wrapper">
      <SignIn onRefetch={props.onRefetch} />
    </div>
  )
}

export default Auth
