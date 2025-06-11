import TodosList from "@/components/features/task/taskList" 
import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";


export default async function TodosPage() {
    // const data = await getAllTasksBelongToUserId(userId);

    return (
        <>
            <h1>Todos Page</h1>
            <p>This is the Todos page content.</p>
            <p>User ID from cookies:</p> 
            <TodosList />
        </>
    );
}