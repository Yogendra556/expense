"use client"
import React from 'react'
import axios from "axios"
import router, { useRouter } from "next/navigation"


export default function Sidebar(){
    const router = useRouter() 
      const signout = async()=>{
        const res = await axios.get('/api/users/logout')
        console.log(res)
        if(res.data.status === 346){
           router.push('/')
        }

    }
 return (
        <div className=''>
        <span className='font-poppins '>
            <div className='fixed'>
            <div className='text-2xl text-white p-[3vh]'>EXPENSE</div>
            <div className='flex items-center pl-[2vh] pt-[1vh] text-gray-400'><div className=''>
                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                <lord-icon
                    src="https://cdn.lordicon.com/shcfcebj.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#848484,secondary:#ffffff"
                    style={{ width: 30, height: 30 }}>
                </lord-icon>
            </div><button onClick={()=>{router.push('/transaction')}}>Dashboard</button></div>

            <div className='flex items-center pl-[2vh] pt-[1vh]  text-gray-400'>
                <div className=''>
                    <script src="https://cdn.lordicon.com/lordicon.js"></script>
    <lord-icon
    src="https://cdn.lordicon.com/ysqeagpz.json"
    trigger="hover"
    stroke="bold"
    colors="primary:#848484,secondary:#ffffff"
    style={{width:30,height:30}}>
    </lord-icon></div><button onClick={()=>{router.push('/profile')}} className=''>Profile</button></div>
            <div className='pl-[3vh] mt-[58vh]  text-gray-400'>Help</div>
            <div className='pl-[3vh] mt-[2vh] text-red-400'><button onClick={()=>{signout()}}>Sign out</button></div>
        </div>
        </span>
        </div>
    )
}