import User from "@/models/models";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

connect()

export async function GET(req) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token").value
    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
    const email = decodedToken.email
    const user = await User.findOne({email})  
    return NextResponse.json(user)  
}

