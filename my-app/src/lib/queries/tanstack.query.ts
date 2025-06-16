import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllTasksBelongToUserId, createNewTask, updateTask, removeTask } from "@/db/queries/task.queries";
import { Task } from "@/types/types";


export function useGetTasksQuery ({ 
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

export function useAddTasksMutation ({
    userId, 
    setChosenTodo,
    setNewTitle,
}:{
    userId: string, 
    setChosenTodo: (task: Task) => void
    setNewTitle: (value: string) => void,
}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (title: string) => {
            return createNewTask(userId, title, "")
        },
        onSuccess: (newTask: Task) => {
            queryClient.invalidateQueries({ queryKey: ['todos', userId] });
            setChosenTodo(newTask);
            setNewTitle(''); 
        },
        retry: 3,
    })
}

export function useUpdateTasksMutation ({
    userId,
}: {
    userId: string,
}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (update: Task) => 
            updateTask(update.id, update.title, update.description, update.status, update.urgent, update.important),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', userId] });
        }
    });
}

export function useRemoveTasksMutation ({
    userId,
}: {
    userId: string,
}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId: string) => removeTask(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', userId] }); 
        },
    })
}