import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export const getDataFromToken = (request)=>{
     try {
        const token = request.cookies.get("token").value || "Nothing"
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        console.log(token,decodedToken)
        return decodedToken.email
     } catch (error) {
        return NextResponse.json({
            message:"cant get token",
            status:1998
        })
     }
}