const express=require('express')
const { connection } = require('./db')
const { userRouter } = require('./Routers/userRouter')
const { blogRouter } = require('./Routers/blogRouter')
const cors=require('cors')
require('dotenv').config()
const app=express()

app.use(cors())

app.use(express.json())
app.use('/users',userRouter)
app.use('/blogs',blogRouter)



app.get('/',(req,res)=>{
    res.status(200).send('Welcome to backend of Blog App!')
})


app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log('Connected to DB')
        console.log(`Server is listening to ${process.env.PORT}`)
    }
    catch(err){
        console.log(err.message)
    }
    
})