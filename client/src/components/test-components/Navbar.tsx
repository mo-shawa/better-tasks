import { ReactNode } from "react"

const style = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between"
}

export const Navbar = ({ user }: {user: {name?:string}}) => {
  return (
    <nav style={style}>
      <div>Navbar</div>
      <div>middle</div>
      <div>{user.name}</div>
    </nav>
  )
}
