import { useState } from "react"
import {useHomePageLogin} from "../../../hooks/useHomePageLogin.js"
import { Navigate } from "react-router-dom"
import "./HomePage.css";

const HomePage=()=>{

  const [email,setEmail]=useState('')
  const [loginCheck,setLoginCheck]=useState(false)
  const {loginHandler,loginError}=useHomePageLogin()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await loginHandler(email)
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

export {HomePage}