import { redirect } from "next/navigation";

import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";
import TodosList from "@/components/features/task/taskListModal"  
import { auth0 } from "@/lib/auth0";

export default async function TodosPage() { 
    try {
        // set user_sub from cookie.
        const session = await auth0.getSession();
        if (!session) {
            redirect('/auth/logic');
        }

        const userId = session.user.sub;
        // get all 'task' data belong to user
        const todos = await getAllTasksBelongToUserId(userId);
        // main content
        return <TodosList initialTodos={todos} userId={userId}/>;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return <div>Something went wrong. Please try again later.</div>;
    }
}