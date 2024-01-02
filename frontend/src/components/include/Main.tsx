type MainProps = {}

const Main: React.FC<MainProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <main className="main-wrapper">{props.children}</main>
}

export default Main
