import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/models"
import {NextRequest,NextResponse} from 'next/server'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
 
connect()

export async function POST(request){
    try{
    const reqBody = await request.json()
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token").value
    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
    const email = decodedToken.email
    const {categoryA,categoryB,amount,desc} = reqBody
    
   await User.updateOne(
   {email} ,
  {
    $push: {
      transaction: {
        categoryA,
        categoryB,
        amount,
        desc,
        transactionDate: new Date()
      }
    }
  }
);
    
    return NextResponse.json("Transaction added")
    }
    catch(error){
       return NextResponse.json({
          message:error.message,
          status:444})
    }
  
}
