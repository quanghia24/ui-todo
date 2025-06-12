import { cookies } from "next/headers";

import TodosList from "@/components/features/task/taskListModal" 
import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";
import { useSelector } from "react-redux";
import { UserStateType } from "@/app/UserStoreProviders";



export default async function TodosPage() {
    // const userId = 'ae235c5e-2032-4bec-a9e0-bbd15a43af08';
    const cookieStore = await cookies();
    const userId = await cookieStore.get('userId')?.value;
    // const userId2 = useSelector((state: UserStateType) => state.user.userId)
    const todos = userId? await getAllTasksBelongToUserId(userId): [];

    return (
        // future plan: responsive
        // if screen is small, the second half change into a sidebar model appear from the right side
        <div>
            {userId && <TodosList initialTodos={todos} userId={userId}/>}
        </div>
    );
}