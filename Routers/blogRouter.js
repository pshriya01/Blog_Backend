const express=require('express')
const { BlogsModel } = require('../Models/BlogsModel')
const { auth } = require('../Middlewares/authMiddleware')
const { dateMiddle } = require('../Middlewares/dateMiddleware')



let blogRouter=express.Router()
blogRouter.use(auth)

blogRouter.get('/',async(req,res)=>{
    let filter={}
    let Sort={}
    if(req.query.title){
        filter.title={ $regex: `${req.query.title}`, $options: 'i' } 
    }
    if(req.query.category){
        filter.category={ $regex: `${req.query.category}`, $options: 'i' } 
    }

    if(req.query.sort && req.query.order){
        if(req.query.order==='asc'){
          Sort.date=1
        }
        if(req.query.order==='desc'){
            Sort.date=-1
          }
    }
   try{
      let blogs=await BlogsModel.find(filter).sort(Sort)
      res.status(200).send(blogs)
   }
   catch(err){
    res.status(400).send({'msg':err.message})
   }

})

blogRouter.post('/',dateMiddle,async(req,res)=>{
    try{
       let blog=new BlogsModel(req.body)
       await blog.save() 
       res.status(200).send({'msg':'Blog Posted Successfully !'})
    }
    catch(err){
     res.status(400).send({'msg':err.message})
    }
 
 })


 blogRouter.patch('/:id',async(req,res)=>{
    const {id}=req.params
    const found=await BlogsModel.findOne({_id:id})
    console.log(req.body)
    console.log(found)
    if(found){
    try{
        if(req.body.userId!==found.userId){
            res.status(200).send({'msg':'You Are Not Authorized!'})  
        }else{
            await BlogsModel.findByIdAndUpdate(id,req.body)
            res.status(200).send({'msg':'Blog Updated Successfully !'})
        }
       }
    catch(err){
     res.status(400).send({'msg':err.message})
    }
   }
  else{
        res.status(200).send({'msg':'Blog Not Found !'})
    }
 })


 blogRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    const found=await BlogsModel.findOne({_id:id})
    if(found){
    try{
        if(req.body.userId!==found.userId){
            res.status(200).send({'msg':'You Are Not Authorized!'})  
        }else{
            await BlogsModel.findByIdAndDelete(id)
            res.status(200).send({'msg':'Blog Deleted Successfully !'})
        }
       }
    catch(err){
     res.status(400).send({'msg':err.message})
    }
   }
  else{
        res.status(200).send({'msg':'Blog Not Found !'})
    }
 })

 blogRouter.patch('/:id/like',async(req,res)=>{
    const {id}=req.params
    try{
       const found=await BlogsModel.findOne({_id:id})
       console.log(found)
       if(found){
        found.likes++
        console.log(found.likes)
        await BlogsModel.findByIdAndUpdate(id,found)
        res.status(200).send({'msg':'Likes Updated Successfully !'})
       }else{
        res.status(200).send({'msg':'Blog Not Found !'})
       }
    }
    catch(err){
     res.status(400).send({'msg':err.message})
    }
 
 })

 blogRouter.patch('/:id/comment',async(req,res)=>{
    const {id}=req.params
    const {comment}=req.body
    try{
       const found=await BlogsModel.findOne({_id:id})
       if(found){
        found.comments.push(comment)
        await BlogsModel.findByIdAndUpdate(id,found)
        res.status(200).send({'msg':'Comments Updated Successfully !'})
       }else{
        res.status(200).send({'msg':'Blog Not Found !'})
       }
    }
    catch(err){
     res.status(400).send({'msg':err.message})
    }
 
 })


module.exports={
    blogRouter
}