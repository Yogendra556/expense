import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/models";
import {NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helper/mailer";

connect()
export async function POST(request){
    try{
      const reqBody = await request.json();
      
      const {username,email,password} = reqBody
      const user = await User.findOne({email})
      // console.log({email,password,username})
      const name = await User.findOne({username})
      // console.log(user)

      if(user){
        return NextResponse.json({message:"User already exists",status:234})
      }
      else if(name){
        return NextResponse.json({message:"Username already taken",status:211})
      }
       const salt = await bcryptjs.genSaltSync(10)
       const hashedPassword = await bcryptjs.hash(password,salt)
       const newUser = new User({
        email,username,password:hashedPassword
       })

       const savedUser = await newUser.save()
      // console.log(savedUser)


       const b = await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
       
       return NextResponse.json(
       { 
        message : "User registered succesfully",
        success : true,
        Staus:267,
        savedUser
       }
       )

    }
    catch(error){
      console.log(error.message)
        return NextResponse.json({status:223})
       
    }
    
}