type SidebarProps = {}

const Sidebar: React.FC<SidebarProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return <div className="sidebar-wrapper">
    {props.children}
  </div>
}

export default Sidebar
