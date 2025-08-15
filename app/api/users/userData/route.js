import { connect } from "@/dbconfig/dbconfig";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import User from "@/models/models"
import { NextResponse } from "next/server";

connect()

export async function GET(Request){
    try {
        const cookiesStore = await cookies()
        const token = cookiesStore.get("token").value
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        const email = decodedToken.email
        const user = await User.findOne({email})
        // console.log(user)
        const transaction = user.transaction
        // console.log(transaction)
        return NextResponse.json({transaction})
    } catch (error) {
        console.log(error.message)
    }
}