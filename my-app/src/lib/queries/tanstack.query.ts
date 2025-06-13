import { useQuery } from "@tanstack/react-query";

import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";
import { Task } from "@/types/types";
// will be extracted from jwtoken

export function useTasks({ 
    initialTodos, 
    userId 
}: {
    initialTodos: Task[],
    userId: string
}) {
    return useQuery({
        queryKey: ['todos', userId],
        queryFn: () => getAllTasksBelongToUserId(userId),
        initialData: initialTodos,
    })
}
