'use server'

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth0 } from "@/lib/auth0";

export async function loginSuccessHandler( sub: string ) {
    console.log("111")
    const userStore = await cookies();
    console.log("222")

    if(sub){
        console.log("set cookie for user_sub");
        userStore.set("user_sub", sub);
    }
    console.log("user_sub not found!");
}

