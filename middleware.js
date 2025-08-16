import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request){
    const path = request.nextUrl.pathname

    const isPublic = path==='/login' || path==='/signup' || path==='/verifyemail' || path==='/'

    const cookiesStore = await cookies()
    
    const token = cookiesStore.get("token") 

    if(isPublic && token){
        return NextResponse.redirect(new URL('/transaction',request.url))
    }
       if(!isPublic && !token){
        return NextResponse.redirect(new URL('/',request.url))
    }
    
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyemail',
        '/transaction',
        '/profile'
    ]
}