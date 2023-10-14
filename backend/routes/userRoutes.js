import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from "../utils.js";
import nodemailer from 'nodemailer';
import user from '../models/userModel.js';
const userRoutes= express.Router();
const transporter=nodemailer.createTransport({
    service:'gmail',
auth:{
    user:process.env.EMAIL_ADDRESS,
    pass:process.env.EMAIL_PASSWORD
},
logger: true,
    debug: true, 
    secureConnection: true, 
    secure: true, 
    port: 465, 
    host: 'smtp.gmail.com', 
tls:{
    rejectUnauthorized:false
}})
userRoutes.post('/signin',expressAsyncHandler(async(req,res)=>{
    const User= await user.findOne({emailAddress:req.body.email}) ;
    
    if(User){
        
        if(bcrypt.compareSync(req.body.password,User.password)){
            
            res.send({
                _id:User._id,
                name:User.name,
                email:User.emailAddress,
                isAdmin:User.isAdmin,
                token:generateToken(User)
            });
            return;
        }else{
            
            res.status(401).send({ message: 'Invalid email or password' });
        }
    } 
    else{
        res.status(401).send({ message: 'Invalid email or password' }); 
    }
}));
userRoutes.put('/signup',expressAsyncHandler(async (req,res)=>{
    const newUser=  new user({
        name:req.body.name,
        emailAddress:req.body.emailAddress,
        password:bcrypt.hashSync(req.body.password)
    });
   const User=await newUser.save();
   res.send({
                 _id:User._id,
                name:User.name,
                email:User.emailAddress,
                isAdmin:User.isAdmin,
                token:generateToken(User)
   })
}));
userRoutes.post('/forgetpassword',expressAsyncHandler(async (req,res)=>{
    const mailOption={
        from:process.env.EMAIL_ADDRESS,
        to:req.body.to,
        subject:'Verify Your Account',
        text:'your OTP is 34456',
    };
    await transporter.sendMail(mailOption,(error,info)=>{
        if(error){

            return res.status(500).send(error.toString());
        }
        res.status(200).send('OTP sent to '+ req.body.to+ info.response)
    })
}));
userRoutes.put('/profile',isAuth,expressAsyncHandler(async (req,res)=>{
    const User =await user.findById(req.user._id);
    if(User){
        User.name=req.body.name || User.name;
        User.emailAddress=req.body.email || User.emailAddress;
        if(req.body.password){
            User.password=bcrypt.hashSync(req.body.password,8);
        }
        const updatedUser= await User.save();
        res.send({
            _id:User._id,
            name:User.name,
            email:User.emailAddress,
            isAdmin:User.isAdmin,
            token:generateToken(updatedUser)
        })
    }
    else{
        res.status(404).send({message:'User Not Found'}) 
    }
}))
export default userRoutes;