"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'
import { NextResponse } from 'next/server'

const ChangePasswordPage = () => {
    const [newPassword, setnewPassword] = useState("")
    const [token, settoken] = useState("")
    const [data,setdata] = useState([])
    const router = useRouter()

     useEffect(()=>{
        const urltoken =  window.location.search.split("=")[1]
        console.log(urltoken)
        settoken(urltoken)
       },[])

    const sendData = async()=>{
        try {
          console.log(token)
            const res = await axios.post("/api/users/changePassword",{token,newPassword})
            console.log(res)
            if(res.data.status===99){
              router.push("/login")
            }
            return NextResponse.json("success reset")
        } catch (error) {
            console.log(error.message)
        }
    }

    


  return (
    <div className='flex flex-col justify-center items-center mt-[8vh]'>
        <div className='text-xl'>Change Your Password</div>
        <div className='text-xl mt-[6vh]'> Enter New Password <input className='bg-white rounded-md border-1 text-black px-[1vw] border-black' onChange={(e)=>{setnewPassword(e.target.value)}} value={newPassword}/> </div>
       <div><button onClick={()=>{sendData()}} className='rounded-md bg-blue-400 text-black px-[2vw] py-[1vh] text-xl mt-[6vh]'>Change</button></div>
    </div>
  )
}

export default ChangePasswordPage
