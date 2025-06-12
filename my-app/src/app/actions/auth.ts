"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
// import { useDispatch } from "react-redux";

import { FormState, SignupFormSchema } from "@/lib/definitions";
import { createUser } from "@/db/queries/user.queries";
import { WriteError, WriteJSON } from "@/utils/utils";
import { setUser, clearUser } from "@/lib/features/users/userSlice"; 


export async function signup(state: FormState, formData: FormData) {
    // validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // return early
    if (!validatedFields.success) { 
        return WriteJSON(400, validatedFields.error.flatten().fieldErrors);
    }

    // create user API
    const data = await createUser(validatedFields.data.name, validatedFields.data.email, validatedFields.data.password);

    const user = data[0]

    if(!user) {
        return WriteError(400, Error('an error occurred while creating your account'));
    }

    // TODO:
    // 4. Create user session
    // 5. Redirect user
}

export async function loginAction() {
    // const dispatch = useDispatch();
    // dispatch(setUser({ userId: 'ae235c5e-2032-4bec-a9e0-bbd15a43af08' }))

    const cookieStore = await cookies();
    await cookieStore.set("userId", 'ae235c5e-2032-4bec-a9e0-bbd15a43af08');
    redirect(`/todos`);
}

export async function logoutAction() {
    // const dispatch = useDispatch();
    // dispatch(clearUser());

    const cookieStore = await cookies();
    await cookieStore.delete("userId")
    redirect(`/`);
}

export async function getUserId() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    if (!userId) {
        redirect(`/login`);
    }
    return userId;
}