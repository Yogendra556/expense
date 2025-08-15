import Image from "next/image";
import Link from "next/link";
import Starfield from "@/components/background";



export default function Home() {



  return (
    <>
      <div className="-z-10"><Starfield/></div>
      <div className="text-7xl font-bold text-white text-center mt-[43vh] z-[10] fixed ml-[38vw]"> EXPENSE</div>
      <div className="flex flex-col mt-[43vh] z-[10] fixed ml-[38vw] ml-[10vw] pt-[30vh] text-white">
        <div className="ml-[5vw]">Have an account ? <Link href='/login' className="text-blue-400">Login</Link></div>
        <div className="ml-[11vw]">OR</div>
        <div className=" ml-[10vw] text-blue-400"><button><Link href='/signup'>Sign up</Link></button></div>
        
      </div>
    </>
  );
}
