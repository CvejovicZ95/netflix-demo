import { useState } from "react"
import useHomePageLogin from "../hooks/useHomePageLogin"
import { Navigate } from "react-router-dom"

const HomePage=()=>{

  const [email,setEmail]=useState('')
  const [loginCheck,setLoginCheck]=useState(false)
  const {login,loginError}=useHomePageLogin()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await login(email)
    setLoginCheck(true)
  }

  return(
    <div className="HomePage">
      <h1>Unlimited movies, TV shows, and more</h1>
      <p>Watch anywhere. Cancel anytime.
        <br></br>
      Ready to watch? Enter your email to restart your membership.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email adress"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button type="submit">Get Started</button>
        {loginCheck && <Navigate to={'/movies'}/>}
        {loginError && <Navigate to={'/register'}/>}
        
      </form>
    </div>
  )
}

export default HomePage