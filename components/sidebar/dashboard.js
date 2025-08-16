"use client"
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import Select from 'react-select';

const Dashboard = () => {
    const [view, setview] = useState(false)
    const [categoryA, setcategoryA] = useState("Expense")
    const [categoryB, setcategoryB] = useState("")
    const [data, setdata] = useState([])
    const [refresh, setrefresh] = useState(true)
    const [balance, setbalance] = useState(0)
    const [amount, setamount] = useState("")
    const [desc, setdesc] = useState("")

    useEffect(() => {
        userData()

    }, [view, refresh])

    useEffect(() => {
        const total = data.reduce((acc, item) => {
            const amount = Number(item.amount);
            return item.categoryA === "Expense"
                ? acc - amount
                : acc + amount;
        }, 0);

        setbalance(total);
    }, [data]);

    const userData = async (req) => {
        const res = await axios.get("/api/users/userData")
        setdata(res.data.transaction)
    }


       const handleSave = async () => {
        const response = await axios.post("/api/users/transaction", { categoryA, categoryB, amount, desc })
        setamount("")
        setdesc("")
        setview(false)
    }


    // In axios delete you cant put data directly like post use {data:{value}}
    const deleteData = async (value) => {

        userData()
        setrefresh(!refresh)
        console.log(value)
        const res = await axios.delete("/api/users/delete", { data: { ObjectId: value } })
        console.log(res)
    }



    const groupedOptions = [
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




 
    return (
        <>
            <div className='text-xl font-playwrite text-white'>DASHBOARD
                <button onClick={() => { setview(true) }} className='ml-[60vw] bg-gray-300 rounded-2xl text-gray-700 px-[1vw] py-[0.5vh]'>
                    Add Transaction
                </button>
            </div>

            <div className='flex flex-row gap-[2vw]'>
                <div className='mt-[6vh] ml-[2vw]'>
                    <div className='bg-gray-900 w-[20vw] rounded-md text-[2vw]' >
                        <div className='px-[3vh] py-[0.5vw]  mt-[4vh] text-gray-400 '>Current Balance</div>
                        <div className='text-green-300 ml-[1vw]'>{balance}</div>
                    </div>
                </div>
                <div className='mt-[8vh]'>
                    <div className='text-2xl text-gray-400'>Past Transactions</div>
                    {data.slice(0, 5).map((item) => (
                        <div className='relative border-1 border-white rounded-md min-w-[40vw] pl-[2vw] mt-[2vh] flex flex-col'>
                            <div className='flex flex-row'><div className={item.categoryA === "Expense" ? 'text-red-400 text-xl' : "text-green-400 text-xl"}>{item.categoryA}</div><div className='ml-[27vw] fixed'>Date</div><div className='fixed ml-[18vw]'>Time</div></div>
                            <div className='flex flex-row items-center'>
                                <div className='text-white'>Category : {item.categoryB}</div><div className='text-white pl-[5vh]'>Amount : {item.amount}</div>
                                <button className='fixed pl-[34vw] pt-[5vh]' onClick={() => { deleteData(item._id) }}><svg width="24" height="24" viewBox="0 0 24 24" fill="red">
                                    <path d="M3 6l3 18h12l3-18H3zm18-2h-5.5l-1-1h-5l-1 1H3v2h18V4z" />
                                </svg></button>

                            </div>
                            <div className='text-white'>Description : {item.desc}</div>

                        </div>
                    ))}
                </div>
            </div>

            {view && <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs'>

                <div className='bg-black w-[40vw] h-[58vh]  rounded-xl border-1 border-gray-500 '>
                    <div className='text-2xl pl-[2vw] pt-[2vh] text-white flex'>Add Transaction
                        <button onClick={() => { setview(false) }}> <svg className='ml-[22vw]' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8B1A10"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg> </button>
                    </div>

                    <div className='relative flex  ml-[10vw] mt-[4vh] border-1 border-gray-400 rounded-2xl w-[20vw]'>
                        <button className='text-center z-10 px-[2vw] py-[1vh] text-gray-600' onClick={() => { setcategoryA("Expense") }}>Expense</button>
                        <button className='text-center z-10 px-[4vw] text-gray-600' onClick={() => { setcategoryA("Income") }}>Income</button>

                        <div
                            className="absolute top-0 left-0 h-full w-1/2 bg-gray-400 rounded-xl transition-transform duration-300"
                            style={{
                                transform:
                                    categoryA === "Expense" ? "translateX(0%)" : "translateX(100%)",
                            }}>
                        </div>
                    </div>
                    <div className='flex flex-row text-gray-300 items-center'>
                        <div className='pl-[2vw] pt-[2vh] flex flex-col text-gray-300'>Amount
                            <div className=''><input onChange={(e) => { setamount(e.target.value) }} value={amount} className='w-[12vw] mt-[1vh] py-[1vh] border-1 border-gray-300 rounded-md pl-[1vw]' placeholder='0.00 USD' /></div>
                        </div>
                        <div className='pl-[10vw] pt-[4vh] '>
                            <Select
                                styles={customStyles}
                                options={groupedOptions}
                                onChange={(option) => setcategoryB(option.value)}
                                placeholder="Select a category"
                                isClearable
                                isSearchable
                            /></div>
                    </div>
                    <div className='pl-[2vw] pt-[4vh] flex flex-col text-gray-300'>Description
                        <div className=''><input onChange={(e) => { setdesc(e.target.value) }} value={desc} className='w-[24vw] h-[6vh] mt-[1vh] py-[1vh] border-1 border-gray-300 rounded-md pl-[1vw]' placeholder='Bought a phone' /></div>
                    </div>
                    {categoryA !== "" && categoryB !== "" && desc !== "" && amount !== "" && <div className='text-center'><button className='bg-white rounded-xl text-black px-[2vw] py-[1vh] mt-[5vh] mx-[2vw] w-[35vw]' onClick={() => handleSave()}>Save</button></div>}


                </div>
            </div >}



        </>
    )
}

export default Dashboard