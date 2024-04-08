import jwt from 'jsonwebtoken'


const generateTokenAndSetCookie=(userId,res)=>{
  const token=jwt.sign({userId},process.env.SECRET_KEY,{
    expiresIn: '30m'
  })

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, 
    sameSite: 'strict'
  });
}

export default generateTokenAndSetCookie