"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function loginAction() {
    const cookieStore = await cookies();
    await cookieStore.set("userId", 'ae235c5e-2032-4bec-a9e0-bbd15a43af08');
    redirect(`/todos`);
}

export async function logoutAction() {
    const cookieStore = await cookies();
    await cookieStore.delete("userId")
    redirect(`/`);
}