import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"
import reportWebVitals from "./reportWebVitals"
import Store from "./store"
import { Provider } from "react-redux"
import "./i18next"
import "./api"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
