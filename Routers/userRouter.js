const express=require('express')
const { UserModel } = require('../Models/userModel')
var jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

let userRouter=express.Router()

userRouter.post('/register',async(req,res)=>{
     let {username,Avatar,Email,Password}=req.body
    //  console.log(req.body)

     try{
        const ExistingUser=await UserModel.findOne({Email})
        if(ExistingUser){
            res.status(200).send({'msg':'User Already Exsits!'})
        }
        else{
            bcrypt.hash(Password, 5, async function(err, hash) {
               if(hash){
                const user=new UserModel({username,Avatar,Email,Password:hash})
                await user.save()
                res.status(200).send({'msg':'New User Registered Successfully!'})
               }else{
                res.status(400).send({'msg':err})
               }
            });
        }
     }
     catch(err){
        res.status(400).send({'msg':err.message})
     }
})


userRouter.post('/login',async(req,res)=>{
    let {Email,Password}=req.body
    try{
       const User=await UserModel.findOne({Email})
       console.log(User)
       if(User){

        bcrypt.compare(Password, User.Password, function(err, result) {
            if(result){
               var token = jwt.sign({ username: User.username,userId:User._id }, 'masai');
               res.status(200).send({'msg':'Login Successful ! ',token})
            }else{
                res.status(200).send({'msg':'Login Failed ! '})
            }
        });

       }else{
        res.status(200).send({'msg':'User Do Not Exist!'})
       }
       
    }
    catch(err){
       res.status(400).send({'msg':err.message})
    }
})





module.exports={
    userRouter
}