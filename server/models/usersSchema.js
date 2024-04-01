import mongoose from "mongoose"

const usersSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  }
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => new Date().toLocaleString(),
  }
})

const User=mongoose.model('User',usersSchema)

export default User