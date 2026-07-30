import { userModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
export const registerUser = async(req,res) => {
    const {username,email,password,role="user"} =req.body
    const userExists = await userModel.findOne({
        $or : [
            {username},{email}
        ]
    })
    if(userExists) {
        res.status(409).json({message:"User already exisits"})
    }
    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({username,email,password:hash,role})
    const token =jwt.sign(
        {
            id:user._id,
            role:user.role
        },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(200).json({message:"Userdata collected!",user:{
        id:user._id,
        username:user.username,
        email:user.email,
        password:user.password,
        role:user.role
    }})
}
export const loginUser = async(req,res) => {
    const {username,email,password} = req.body 
    const user = await userModel.findOne({$or:[{username},{email}]})
    if(!user){
        return res.status(401).json({message:"Invalid creadentials!"})
    }
    const validPass = await bcrypt.compare(password,user.password)
    if(!validPass) {
        return res.status(401).json({message:"Invalid password"})
    }
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(200).json({message:"Logged in successfully!",user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    }
    })

//compare password using the command bycrypt.compare(string1,
    

}
export const logoutUser = async(req,res) => {
    res.clearCookie("token")
    res.status(200).json({message:"User logged out successfully!"})

}