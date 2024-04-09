import User from '../models/usersSchema.js'
import bcrypt from 'bcrypt';
import {generateTokenAndSetCookie} from '../utils/generateToken.js'

export const register = async (req,res)=>{
  try{
    const {email,password,confirmPassword,phoneNumber} = req.body

    if(password !==confirmPassword){
      return res.status(400).json({error:'Passwords dont match'})
    }
    const user = await User.findOne({email})
    const phone=await User.findOne({phoneNumber})

    if(user){
      return res.status(400).json({error:'Email adress is already in use'})
    }
    if(phone){
      return res.status(400).json({error:'Phone number is already in use'})
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser = new User({
      email,
      password:hashedPassword,
      phoneNumber
    })

    if(newUser){
      generateTokenAndSetCookie(newUser._id,res);
      await newUser.save()

      res.status(201).json({
        _id:newUser._id,
        email:newUser.email,
        phoneNumber:newUser.phoneNumber
      });
    }else{
      res.status(400).json({error:'Invalid user data'})
    }
  }catch(error){
    console.log('Error in register controller',error.message)
    res.status(500).json({error:'Internal server error'})
  }
}

export const login=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    const isPasswordCorrect=await bcrypt.compare(password, user.password || "");

    if(!user || !isPasswordCorrect ){
      return res.status(400).json({error:'Invalid email or password'})
    }

    const token=generateTokenAndSetCookie(user._id,res)

    res.status(200).json({
      token:token,
      _id:user._id,
      email:user.email,
      phoneNumber:user.phoneNumber
    });

  }catch(error){
    console.log('Error in login controller',error.message)
    res.status(500).json({error:'Internal server error'})
  }
}

export const homePageLogin=async(req,res)=>{
  try{
    const {email}=req.body;
    const user=await User.findOne({email});

    if(!user){
      return res.status(400).json({error:'Invlaid email'})
    }

    const token=generateTokenAndSetCookie(user._id,res)

    res.status(200).json({
      token:token,
      _id:user._id,
      email:user.email,
      phoneNumber:user.phoneNumber
    });

  }catch(error){
    console.log('Error in login controller',error.message)
    res.status(500).json({error:'Internal server error'})
  }
}

export const logout = async (req,res)=>{
  try{
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({message:'Logged out successfully'})
  }catch(error){
    console.log('Error in logout controller',error.message)
    res.status(500).json({error:'Internal server error'})
  }
}