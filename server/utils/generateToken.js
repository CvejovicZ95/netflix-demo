import jwt from 'jsonwebtoken'

const secretKey='netflix';

const generateTokenAndSetCookie=(userId,res)=>{
  const token=jwt.sign({userId},secretKey,{
    expiresIn: '15d'
  })

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS format (prepravljeno iz vašeg koda)
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    sameSite: 'strict' //CSRF attacks
  });
}

export default generateTokenAndSetCookie