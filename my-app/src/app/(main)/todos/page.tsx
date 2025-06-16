import { cookies } from "next/headers";

import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";
import TodosList from "@/components/features/task/taskListModal" 
import { redirect } from "next/navigation";
import ActionButton from "@/components/common/ActionButton";
import { auth0 } from "@/lib/auth0";
import { setEngine } from "crypto";

export default async function TodosPage() { 
    
    const cookieStore = await cookies();
    
    const user_sub = await cookieStore.get('user_sub')?.value;
    if (!user_sub) {
        console.log("user_sub doesn't exist");
        // redirect('/');
    } else {
        console.log("user:", user_sub);
    }

    // const todos = await getAllTasksBelongToUserId(user_sub);

    return (
        // future plan: responsive
        // if screen is small, the second half change into a sidebar model appear from the right side
        <div>
            {/* <TodosList initialTodos={todos} userId={user_sub}/> */}
            {user_sub}
        </div>
    );
}