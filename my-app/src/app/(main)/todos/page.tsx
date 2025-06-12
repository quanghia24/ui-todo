import { cookies } from "next/headers";

import TodosList from "@/components/features/task/taskList" 
import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";



export default async function TodosPage() {
    // const userId = 'ae235c5e-2032-4bec-a9e0-bbd15a43af08';
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