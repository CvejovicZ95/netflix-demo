import jwt from 'jsonwebtoken'
import User from '../models/usersSchema.js'

const protectRoute = async (req,res,next)=>{
  try{
    const token=req.cookies.token;
    //token is UNDEFINED, need to fix
    if(!token){
      return res.status(401).json({error:'Unauthorized-No Token Provided'})
    }

    const decoded=jwt.verify(token, process.env.SECRET_KEY)
    
    if(!decoded){
      return res.status(401).json({error:'Unauthorized-Invalid Token'})
    }

    const user=await User.findById(decoded.userId).select('-password')

    if(!user){
      return res.status(404).json({error:'User not found'})
    }

    req.user=user

    next()
  }catch(error){
    console.log('Error in protected rotue middleware',error.message)
    res.status(500).json({error:'Server error'})
  }
}

export  {protectRoute}