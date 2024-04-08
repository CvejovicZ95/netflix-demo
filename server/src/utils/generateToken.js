import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie=(userId,res)=>{
  const token=jwt.sign({userId},process.env.SECRET_KEY,{
    expiresIn: '30m'
  })

  res.cookie('token', token, {
    maxAge: 30 * 60 * 1000, 
    httpOnly: true, 
     sameSite: 'none',
  });
  return token;
}

export default generateTokenAndSetCookie