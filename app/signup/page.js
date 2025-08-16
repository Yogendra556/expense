"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function Signup() {
  const router = useRouter()
  const [user, setuser] = useState({ username: "", email: "", password: "" })
  const [buttonDisabled, setbuttonDisabled] = useState(false)

  
  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(true)
    }
  }, [user])

  const submit = async () => {
    try {
      console.log(user)
      const response = await axios.post("/api/users/signup", user)
      console.log(response)
      if(response.data.status === "223"){
        console.log("User exists")
        toast.error("User exists")
      }
      router.push('/sentmail')
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }


  return (

    <div className="bg-gradient-to-b from-[rgb(240,84,165)] to-[#041284] via-[#2E3CAB] min-h-[100vh] ">
      <div className="text-4xl font-poppins font-bold pt-[2vw] pl-[2vw] text-amber-100">
        Expense
      </div>
      <div className="flex flex-col justify-center items-center pt-[12vh]">
        <div className="text-3xl text-center font-bold text-amber-100">Sign Up</div>
        <div className="bg-[#2E3CAB] rounded-md border-1 border-black mt-[8vh] min-h-[40vh] min-w-[40vw] shadow-2xl text-amber-100">
          <form>
            <div className="pt-[4vh] flex flex-row gap-[4vw] items-center">
              <div className="pl-[1vw] text-xl min-w-[10vw]">Username</div>
              <div> <input value={user.username} onChange={(e) => { setuser({ ...user, username: e.target.value }) }} className='border-1  rounded-md px-[1vw] py-[1vh]' name="username" placeholder="" required /></div>
            </div>
            <div className="pt-[4vh] flex flex-row gap-[4vw] items-center">
              <div className="pl-[1vw] text-xl min-w-[10vw]">Email</div>
              <div><input value={user.email} onChange={(e) => { setuser({ ...user, email: e.target.value }) }} className='border-1  rounded-md px-[1vw] py-[1vh]' name="password" type="text" placeholder="" required /></div>
            </div>
            <div className="flex flex-row gap-[4vw] pt-[4vh] items-center">
              <div className="pl-[1vw] text-xl min-w-[10vw]">Password</div>
              <div><input value={user.password} onChange={(e) => { setuser({ ...user, password: e.target.value }) }} className='border-1  rounded-md px-[1vw] py-[1vh]' name="password" type="password" placeholder="" required /></div>

            </div>
            {buttonDisabled && <div className="pt-[2vh] pl-[17vw]"><button onClick={() => { submit() }} className='rounded-xl px-[2vw] py-[1vh] bg-black text-blue-400' type="button">Sign Up</button></div>}</form>
          {/*Put the submit button outside form or make its type submit because this button is caused a reload before router can push new path
         If your submit button is inside a <form>, clicking it likely reloads the page before router.push() executes.
         By default, when a button inside a <form> is clicked, the browser performs a full page submission and reload. This happens before your submit() logic—including router.push()—gets a chance to run.

As a result:

router.push() never executes.

The browser navigates or reloads before your custom code runs.

No navigation to your desired route occurs via client-side routing.  */}
          
        </div>
      </div>
    </div>
  )
}
