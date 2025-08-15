
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers';
import {connect} from "@/dbconfig/dbconfig"
import { NextResponse } from 'next/server';
import User from '@/models/models';

connect()

export async function POST(request){
    const reqBody = await request.json()
    const {newUser} = reqBody
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token").value
    const decodedToken = await jwt.verify(token,process.env.TOKEN_SECRET)
    const {email,userId} = decodedToken
    console.log(email)
        console.log(newUser)
    await User.findOneAndUpdate({email},
        {$set:{username:newUser}}
    )
    return NextResponse.json({status:110})
}