import { cookies } from "next/headers";

import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";
import TodosList from "@/components/features/task/taskListModal" 

export default async function TodosPage() { 
    const cookieStore = await cookies();
    const userId = await cookieStore.get('userId')?.value;
    const todos = userId? await getAllTasksBelongToUserId(userId): [];

    return (
        // future plan: responsive
        // if screen is small, the second half change into a sidebar model appear from the right side
        <div>
            {userId && <TodosList initialTodos={todos} userId={userId}/>}
        </div>
    );
}