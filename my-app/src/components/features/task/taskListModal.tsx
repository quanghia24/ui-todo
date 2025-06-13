"use client"

// external
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TextField, Card } from "@mui/material";
import { useState } from "react";

// internal
import { getAllTasksBelongToUserId, createNewTask } from "@/db/queries/task.queries";
import CheckboxList from "@/components/common/CheckboxList";   
import { Task } from "@/types/types"; 

// local
import DescriptionModal from "./descriptionModal";

export default function TodosList({ 
    initialTodos, 
    userId 
}: {
    initialTodos: Task[],
    userId: string
}) { 
    const queryClient = useQueryClient();
    const [chosenTodo, setChosenTodo] = useState<Task| null>(null)
    const [newTitle, setNewTitle] = useState<string>('');

    // const { data, isPending, isError} = useTasks({initialTodos, userId});
    const { data, isPending, isError} = useQuery({
        queryKey: ['todos', userId],
        queryFn: () => getAllTasksBelongToUserId(userId), 
        initialData: initialTodos,
    });
    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error loading todos</div>;

    const addmutation = useMutation({
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
    
    const handleAddTask = () => {
        addmutation.mutate(newTitle);
        console.log(newTitle);
    }

    return (
        <div className="flex justify-between" >   
            <div className="w-[49%] flex flex-col">
                <Card className="p-2 h-[87vh]">
                    <div className="flex flex-col h-full">
                        {/* Input new task box */}
                        <div>
                            <form className="mt-2" action={handleAddTask}>
                                <TextField fullWidth label="Add task" variant="outlined" value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}}/>
                            </form>
                            <p className="text-gray-400 pl-3 mt-2">Completed | count: {data.filter(todo => todo.status).length}</p> 
                        </div>
                        
                        {/* Checked tasks */}  
                        <div className="overflow-y-scroll no-scrollbar flex-1">
                            <CheckboxList handler={setChosenTodo}  data={data} userId={userId}/>
                        </div>
                    </div>
                </Card>
            </div>  

            {/* Task Detail */}
            {chosenTodo && <DescriptionModal todo={chosenTodo} userId={userId}/>}
        </div> 
    );
}