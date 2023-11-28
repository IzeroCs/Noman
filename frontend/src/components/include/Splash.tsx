import className from "classnames"
export type SplashProps = {}

const Splash: React.FC<SplashProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div className="splash-wrapper">
      <Spinner />
    </div>
  )
}

export const Spinner: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className("spinner", props.className)}
    >
      <ellipse cx="12" cy="5" rx="4" ry="4" />
    </svg>
  )
}

export default Splash
