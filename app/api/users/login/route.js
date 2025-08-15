import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/models";
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";


connect()

export async function POST(request){
   try{
      const {email,password} = await request.json()
      const user = await User.findOne({email})
      
      if(!user){
        return NextResponse.json({error:"User not found"},{status:221})
      }
    
      const userPassword = await bcryptjs.compare(password,user.password);
      if(!userPassword){
        return NextResponse.json({error:"Incorrect Password"})
      }
      
      const tokenData = {
        email : user.email,
        userId : user._id
      }

        const response = NextResponse.json({
            message:"Login succesfull",
            success : true,
            status : 224
        })
        
      const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:'1d'})
      response.cookies.set("token",token,{
        httpOnly : true
      })
      return response;

   }
   catch(error){
    console.log(error)
   }

}