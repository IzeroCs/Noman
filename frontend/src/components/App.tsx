import useAxios from "axios-hooks"
import React, { useState, useEffect } from "react"
import Main from "./include/Main"
import Auth from "./auth"
import ContextMenu from "./include/ContextMenu"
import Sidebar from "./include/Sidebar"
import Content from "./include/Content"
import TreeView from "./view/TreeView"
import Explorer from "./explorer"

import "../sass/app.scss"
import Splash from "./include/Splash"

const App: React.FC = () => {
  const [{ loading, error }, refetch] = useAxios({
    url: "/users/profile",
    method: "GET"
  })

  const [windowHeight, setWindowHeight] = useState(
    document.documentElement.clientHeight
  )

  const dispatchResize = () =>
    setWindowHeight(document.documentElement.clientHeight)
  const dispatchContextMenu = (e: any) => e.preventDefault()

  const onRefetch = (): any => refetch()

  useEffect(() => {
    window.addEventListener("resize", dispatchResize)
    window.addEventListener("contextmenu", dispatchContextMenu)

    return () => {
      window.removeEventListener("resize", dispatchResize)
      window.removeEventListener("contextmenu", dispatchContextMenu)
    }
  })

  return (
    <div
      style={{
        height: windowHeight + "px"
      }}
    >
      <div className="wrapper">
        {!loading && !error && (
          <Main>
            <Sidebar>
              <TreeView />
            </Sidebar>
            <Content>
              <Explorer />
            </Content>
            <ContextMenu />
          </Main>
        )}
        {!loading && error && <Auth onRefetch={onRefetch} />}
        {loading && <Splash />}
      </div>
    </div>
  )
}

export default App
