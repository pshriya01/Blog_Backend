const mongoose=require('mongoose')

const blogsSchema=mongoose.Schema({
    username:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    date:{type:String,required:true},
    likes:{type:Number,required:true,default:0},
    comments:[],
    userId:{type:String,required:true}
})

let BlogsModel=mongoose.model('Blog',blogsSchema)

module.exports={
    BlogsModel
}