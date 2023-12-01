import ExplorerBreadcrumb from "./Breadcrumb"
import ExplorerToolbar from "./Toolbar"
import ExplorerView from "./View"
import useAxios from "axios-hooks"
import { useEffect, useState } from "react"

type ExplorerProps = {}

const breadcrumb = ["Home", "IzeroCs", "Downloads"]

const Explorer: React.FC<
  ExplorerProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [files, setFiles] = useState([])
  const [{ data, loading, error }, axiosExecute, axiosCancel] = useAxios(
    {
      url: "/files/scan",
      method: "GET"
    },
    { manual: true, autoCancel: false }
  )

  useEffect(() => {
    axiosExecute()
      .then((res) => {
        setFiles(res.data.list)
      })
      .catch((err) => {})
  }, [axiosExecute])

  return (
    <div className="explorer-wrapper">
      <ExplorerToolbar />
      <ExplorerBreadcrumb list={breadcrumb} />
      <ExplorerView files={files} />
    </div>
  )
}

export default Explorer
