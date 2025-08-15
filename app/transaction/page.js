"use client"
import React from 'react'
import Dashboard from "@/components/sidebar/dashboard";
import Sidebar from "@/components/sidebar/page";

const page = () => {
  return (
    <>
     <div className="flex gap-[2vw]">
      <Sidebar/>
      <span className="mt-[3vh] ml-[10vw]"><Dashboard/></span>
      </div>
    </>
  )
}

export default page