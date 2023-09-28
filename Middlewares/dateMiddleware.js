const dateMiddle=(req,res,next)=>{
    try{
        req.body.date=new Date().toISOString()
        next()
    }
    catch(err){
        res.status(400).send({'msg':err.message})
       }
}

module.exports={
    dateMiddle
}