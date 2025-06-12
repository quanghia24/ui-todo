"use client"

import { Box, Divider, TextField } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllTasksBelongToUserId, createNewTask } from "@/db/queries/task.queries";
import { Task } from "@/types/types";
import { useState } from "react";
import DescriptionModal from "./descriptionModal";

export default function TodosList({ 
    initialTodos, userId 
}: {
    initialTodos: Task[],
    userId: string
}) {
    // const userId = "ae235c5e-2032-4bec-a9e0-bbd15a43af08";
    const queryClient = useQueryClient();

    const { data, isPending, isError} = useQuery({
        queryKey: ['todos', userId],
        queryFn: () => getAllTasksBelongToUserId(userId), 
        initialData: initialTodos,
    });

    const [chosenTodo, setChosenTodo] = useState<Task| null>(null)

    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error loading todos</div>;
    
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >   
            <div className="border w-[50%]"> 
                {/* first half*/}
                {/* Displace todo list to the main page */}
                <TextField fullWidth id="inputNewTask" label="Add task" variant="outlined" />
                <Divider orientation="horizontal" flexItem/>
                {data.map((todo) => (
                    <div className="border flex flex-row">
                        <input type="checkbox"/>
                        <div className="border w-full" onClick={() => {setChosenTodo(todo)}}  key={todo.id}>
                            <p>{todo.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* <Divider orientation="vertical"/>

            {/* second half*/}
            {chosenTodo && <DescriptionModal todo={chosenTodo}/>}
        </Box>
        // <div>
        //     <div>
        //         {data.map((todo) => (
        //             <div className="border m-5" key={todo.id}>
        //                 <p>{todo.title}</p>
        //             </div>
        //         ))}
        //     </div>
        //     <div>

        //     </div>
        // </div>
    );
}