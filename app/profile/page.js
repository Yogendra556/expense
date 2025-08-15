"use client"
import React from 'react'
import Dashboard from "@/components/sidebar/dashboard";
import Sidebar from "@/components/sidebar/page";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';




export default function profilePage() {
    const [user, setuser] = useState("")
    const [category, setcategory] = useState("")
    const [transaction, settransaction] = useState([])
    const [view, setview] = useState("1")
    const [newUser, setnewUser] = useState("")
    
      
    const groupedOptions = [
        { value: 'food', label: 'food' },
        { value: 'carrot', label: 'Carrot' },
        { value: 'spinach', label: 'Spinach' },
    ];
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "black",
            border: "1px solid #444",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "black",
        }),
        menuList: (provided) => ({
            ...provided,
            backgroundColor: "black",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? "#333"
                : state.isSelected
                    ? "#555"
                    : "black",
            color: "white",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "white",
        }),
    };
    const getTransaction = async () => {
        const response = await axios.get("/api/users/userData")
        settransaction(response.data.transaction)
    }
    const data = async () => {
        const res = await axios.get("/api/users/profile")
        setuser(res.data.username)
    }
    const deleteData = async(value)=>{
            getTransaction()
            console.log(value)
            const res = await axios.delete("/api/users/delete",{data:{ObjectId : value}})
            console.log(res)
        }
    useEffect(() => {
        data()
        getTransaction()
    }, [category,user])

        const callChange = async()=>{
        setview("2")
        await axios.get("/api/users/changePassword")
        
    }
    const saveUser = async()=>{
        const res = await axios.post("/api/users/changeUsername",{newUser})
        setview("1")
    }


    return (
        <div>
        {view==="1" && <div className='flex'>
            <div className=''><Sidebar/></div>
            <div className='flex flex-col ml-[10vw]'>
            <div className='text-2xl text-white text-center pt-[2vh] pl-[10vw]'>Hey! {user}</div>
            <div className='pl-[10vw] pt-[4vh] '>
                <Select
                    styles={customStyles}
                    options={groupedOptions}
                    onChange={(option) => setcategory(option.value)}
                    placeholder="Select a category"
                    isClearable
                    isSearchable
                /></div>
<div className='pl-[2vw]'>
    {category!=="" && transaction.filter((item)=>item.categoryB===category).map(item=>(
        <div className='border-1 border-white rounded-md min-w-[40vw] pl-[2vw] mt-[2vh] flex flex-col'>
                    <div className='flex flex-row'><div className={item.categoryA === "Expense" ? 'text-red-400 text-xl' : "text-green-400 text-xl"}>{item.categoryA}</div><div className='ml-[27vw] relative'>Date</div><div className='relative ml-[18vw]'>Time</div></div>
                    <div className='flex flex-row items-center'>
                        <div className='text-white'>Category : {item.categoryB}</div><div className='text-white pl-[5vh]'>Amount : {item.amount}</div>
                        <button className='relative pl-[34vw] pt-[5vh]' onClick={() => { deleteData(item._id) }}><svg width="24" height="24" viewBox="0 0 24 24" fill="red">
                            <path d="M3 6l3 18h12l3-18H3zm18-2h-5.5l-1-1h-5l-1 1H3v2h18V4z" />
                        </svg></button>

                    </div>
                    <div className='text-white'>Description : {item.desc}</div>
                </div>
    ))}
            {category === "" && transaction.map((item) => (
                <div className='relative border-1 border-white rounded-md min-w-[40vw] pl-[2vw] mt-[2vh] flex flex-col'>
                    <div className='flex flex-row'><div className={item.categoryA === "Expense" ? 'text-red-400 text-xl' : "text-green-400 text-xl"}>{item.categoryA}</div><div className='ml-[27vw] relative'>Date</div><div className='relative ml-[18vw]'>Time</div></div>
                    <div className='flex flex-row items-center'>
                        <div className='text-white'>Category : {item.categoryB}</div><div className='text-white pl-[5vh]'>Amount : {item.amount}</div>
                        <button className='relative pl-[34vw] pt-[5vh]' onClick={() => { deleteData(item._id) }}><svg width="24" height="24" viewBox="0 0 24 24" fill="red">
                            <path d="M3 6l3 18h12l3-18H3zm18-2h-5.5l-1-1h-5l-1 1H3v2h18V4z" />
                        </svg></button>

                    </div>
                    <div className='text-white'>Description : {item.desc}</div>

                </div>
            ))}
            </div>
            </div>
            <div className='text-xl mt-[4vh] ml-[2vw]'>
            <div>Username : {user}</div>
            <button className=' mt-[2vh] border-1 rounded-md bg-blue-500 text-black text-xl px-[2vw] py-[1vh]' onClick={()=>{setview("3")}}>Change Username</button>
            <div><button  className='mt-[2vh] border-1 rounded-md bg-blue-500 text-black text-xl px-[2vw] py-[1vh]' onClick={()=>{callChange()}}>Change Password</button></div>
            </div>
            
        </div>}
   {view==="2" && <div className='text-center mt-[20vh] mx-[10vw] text-xl'>Link to reset password sent to you mail</div>}
   {view==="3" && <div className='mt-[10vh] flex flex-col justify-center items-center'>
    <div className='text-white'>Change Your Username</div>
    <div><input value={newUser} onChange={(e)=>{setnewUser(e.target.value)}} className='bg-white rounded-md px-[1vw] border-1 border-black text-black mt-[4vh]'/></div>
    <div><button className='rounded-xl bg-blue-400 text-xl text-black px-[2vw] py-[1vh] mt-[4vh]' onClick={()=>{saveUser()}}>Change UserName</button></div></div>}
        </div>
    )
};