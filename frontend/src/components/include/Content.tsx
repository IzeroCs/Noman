type ContentProps = {}

const Content: React.FC<ContentProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return <div className="content-wrapper">
    {props.children}
  </div>
}

export default Content
