import { Link } from "react-router-dom"
import Logo from "./Logo"
import { useState } from "react"
import useLogin from "../hooks/useLogin"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Login=()=>{

  const [check,setCheck]=useState(true)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const {login}=useLogin()

  const handleCheck=()=>{
    setCheck(prevState=>!prevState)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await login(email,password)
  }

return(
  <>
    <Logo/>
    <form className="loginForm" onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <input
        type="email"
        placeholder="Email adress"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button type="submit">Sign in</button>

      <ToastContainer/>

      <div className="checkboxDiv">
        <div className="remember">
        <input
          id="check"
          type="checkbox"
          checked={check}
          onChange={handleCheck}
        /> 
        <label htmlFor="check">Remember?</label>
        </div>
        <Link to='/help'><p>Need help?</p></Link>
      </div>
      <p>New to Netflix?<Link className="signLink" to='/register'><span> Register now.</span></Link></p>
      <p className="captcha">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
    </form>
  </>
  )
}

export default Login