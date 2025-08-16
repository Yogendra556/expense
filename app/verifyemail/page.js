"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { NextResponse } from 'next/server'

export default function VerifyEmailPage(){
     const router = useRouter()
    const [token, settoken] = useState("")
   
   
    useEffect(()=>{
    const urltoken =  window.location.search.split("=")[1]
    settoken(urltoken)
   },[])

   const send = async()=>{
    try{
        console.log("Hii")
        const response = await axios.post("/api/users/verifyemail",{token})
        console.log(response)
        router.push('/login')
        return NextResponse.json({message : "Verification Successful"})
    }
    catch(error){
        return NextResponse.json({status:189})
    }

   }


    return(
        <div>
            <h1 className='text-center pt-[10vw] text-4xl font-playwrite '>Email Verification</h1>
            <button onClick={()=>{send()}} className='bg-green-300 text-black text-xl ml-[41vw] px-[2vw] py-[1vh] mt-[10vw] rounded-md border-2 border-black '>Click here to verify</button>
        </div>
    )
}