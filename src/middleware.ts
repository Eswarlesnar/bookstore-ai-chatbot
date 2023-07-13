import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limiter";

export async function middleware(req : NextRequest) {
    const ip = req.ip ?? "127.0.0.1"
    
    try{
       const {success} = await rateLimiter.limit(ip)
       if(!success) {
         return new NextResponse("you are writing messsages too fast")
       }else{
        return NextResponse.next()
       }

    }catch(error){
       return new NextResponse("Something went wrong please try again")
    }
}


export const config = {
    matcher : "/api/message/:path*"
}