import { cookies } from "next/headers";

import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";
import TodosList from "@/components/features/task/taskListModal"  
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function TodosPage() { 
    // set user_sub from cookie.
    const session = await auth0.getSession();
    if (!session) {
        redirect('/auth/logic');
    }
    const userId = session.user.sub;

    // get all 'task' data belong to user
    const todos = await getAllTasksBelongToUserId(userId);

    return (
        // future plan: responsive
        // if screen is small, the second half change into a sidebar model appear from the right side
        <>
            <TodosList initialTodos={todos} userId={userId}/>
        </>
    );
}