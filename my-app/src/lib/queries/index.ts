"use server"

import { cookies } from "next/headers"

// will be extracted from jwtoken
const cookieStore = await cookies();
const userId = await cookieStore.get('userId')?.value; 
export const queriesKey = ['todos', userId]