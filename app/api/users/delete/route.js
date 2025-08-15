import { connect } from "@/dbconfig/dbconfig";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import User from "@/models/models"
import { NextResponse } from "next/server";

connect()

export async function DELETE(Request){
    try {
    const reqBody = await Request.json();
    const {ObjectId} = reqBody
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token").value
    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
    const email = decodedToken.email

    await User.updateOne(
   {email},                    
   { $pull: { transaction: { _id: ObjectId } }}
);
    return NextResponse.json({message:"Successful delete",status:334})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json(error.message)
    }
    
}