import React, { useState, useEffect } from "react"
import Header from "./include/Header"
import Main from "./include/Main"
import ContextMenu from "./include/ContextMenu"
import "../sass/app.scss"

const App: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(document
    .documentElement.clientHeight)

  const dispatchResize = () => setWindowHeight(document
    .documentElement.clientHeight)
  const dispatchContextMenu = (e: any) =>
    e.preventDefault()

  useEffect(() => {
    window.addEventListener("resize", dispatchResize)
    window.addEventListener("contextmenu", dispatchContextMenu)

    return () => {
      window.removeEventListener("resize", dispatchResize)
      window.removeEventListener("contextmenu", dispatchContextMenu)
    }
  })

  return <div style={{
    height: windowHeight + "px"
  }}>
    <div className="wrapper">
      <Header />
      <Main />
      <ContextMenu />
    </div>
  </div>
}

export default App
