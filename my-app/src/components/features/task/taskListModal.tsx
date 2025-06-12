"use client"

import { Box, Divider, TextField, Card, IconButton } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllTasksBelongToUserId, createNewTask, removeTask } from "@/db/queries/task.queries";
import { Task } from "@/types/types";
import { useState } from "react";
import DescriptionModal from "./descriptionModal";
import CheckboxList from "@/components/common/CheckboxList"; 

export default function TodosList({ 
    initialTodos, userId 
}: {
    initialTodos: Task[],
    userId: string
}) {
    // const userId = "ae235c5e-2032-4bec-a9e0-bbd15a43af08";
    const queryClient = useQueryClient();
    const [chosenTodo, setChosenTodo] = useState<Task| null>(null)
    const [newTitle, setNewTitle] = useState<string>('');

    const { data, isPending, isError} = useQuery({
        queryKey: ['todos', userId],
        queryFn: () => getAllTasksBelongToUserId(userId), 
        initialData: initialTodos,
    });

    
    const addmutation = useMutation({
        mutationFn: (title: string) => createNewTask(userId, title, ""),
        onSuccess: (newTask: Task) => {
            queryClient.invalidateQueries({ queryKey: ['todos', userId] });
            setChosenTodo(newTask);
        },
        retry: 3,
    })
    
    const handleAddTask = () => {
        addmutation.mutate(newTitle);
        // setNewTitle(''); 
    }
    
    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error loading todos</div>;
    
    return (
        <div className="flex justify-between" >   
            <div className="w-[49%] flex flex-col">
                <Card className="p-2 h-[87vh]">
                    <div className="overflow-y-scroll no-scrollbar">
                        {/* Input new task box */}
                        <div className="">
                            <form className="mt-2" onSubmit={handleAddTask}>
                                <TextField fullWidth label="Add task" variant="outlined" value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}} onSubmit={handleAddTask}/>
                            </form>
                            <p className="text-gray-400 pl-3">Completed | count: {data.filter(todo => todo.status).length}</p> 
                        </div>
                        {/* Done */}  
                        <CheckboxList handler={setChosenTodo}  data={data} userId={userId}/>
                    </div>
                </Card>
            </div>
            {/* second half*/}
            {chosenTodo && <DescriptionModal todo={chosenTodo} userId={userId}/>}
        </div> 
    );
}