import { sendEmail } from '@/helper/mailer';
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers';
import {connect} from "@/dbconfig/dbconfig"
import { NextResponse } from 'next/server';
import User from '@/models/models';
import bcryptjs from "bcryptjs"

connect()

export async function GET(){
    try {
        const cookiesStore = await cookies()
        const token = await cookiesStore.get("token").value
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        const {email,userId} = decodedToken
        await sendEmail({email,emailType:"RESET",userId})
        return NextResponse.json("Succesful Change")
    } catch (error) {
        console.log(error)
    }
}

export async function POST(request) {
    const reqBody = await request.json()
    const {token,newPassword} = reqBody
    const salt = await bcryptjs.genSaltSync(10)
    const hashedNewPassword = await bcryptjs.hash(newPassword,salt)
    console.log(reqBody)
    await User.findOneAndUpdate({resetPasswordToken : token,resetPasswordTokenExpiry:{$gt: Date.now()}},
{$set:{password:hashedNewPassword}})
const user = await User.findOne({resetPasswordToken : token,resetPasswordTokenExpiry:{$gt: Date.now()}})
    if(!user){
        return NextResponse.json({message:"Invalid token"})
    }

    user.resetPasswordToken = undefined,
    user.resetPasswordTokenExpiry = undefined
    await user.save()
   return NextResponse.json({status:99})
}