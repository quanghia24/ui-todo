import { FormState, SignupFormSchema } from "@/lib/definitions";
import { createUser } from "@/db/queries/user.queries";
import { WriteError, WriteJSON } from "@/utils/utils";

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