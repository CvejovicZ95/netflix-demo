import useLogout from "../hooks/useLogout"

const Logout=()=>{
  const {logout} = useLogout()
  return(
    <button onClick={logout} className="logout-button">Logout</button>
  )
}

export default Logout