import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/models";
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'

connect()
// When input is given for email use @gmail otherwise mail wont be send
export async function POST(request){
    const reqBody = await request.json()
    console.log("hello")
    console.log(reqBody)
    const {token} = reqBody
    console.log(token)

    const user = await User.findOne({verifyToken : token,verifyTokenExpiry:{$gt: Date.now()}})
    if(!user){
        return NextResponse.json("Invalid token")
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save()
    
    return NextResponse.json({
        message : "Email verified"
   })
}