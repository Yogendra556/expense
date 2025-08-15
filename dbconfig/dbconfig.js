import mongoose from 'mongoose'

export async function connect(){
   try{
    await mongoose.connect(process.env.MONGO_URI)
   const connection = mongoose.connection

   connection.on('Connected',()=>{
    console.log("db Connected")
   })

    connection.on('Error',()=>{
    console.log("db connection failed")
   })
   }
   catch(error){
    console.log("db error")
    console.log(error)
   }

}