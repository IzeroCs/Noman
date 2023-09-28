import IcoMoon, { IconProps } from "react-icomoon"
import iconSet from "./sass/icomoon/selection.json"

const icon = (props: IconProps) =>
  <IcoMoon iconSet={iconSet}
    {...props} />

export default icon
