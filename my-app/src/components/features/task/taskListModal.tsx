"use client"
// external
import { TextField, Card } from "@mui/material";
import { useState } from "react";
// internal 
import CheckboxList from "@/components/common/CheckboxList";   
import { Task } from "@/types/types"; 
import { useAddTasksMutation, useGetTasksQuery } from "@/lib/queries/tasks.tanstack";
// local
import DescriptionModal from "./descriptionModal";

export default function TodosList({ 
    initialTodos, 
    userId 
}: {
    initialTodos: Task[],
    userId: string
}) {  
    const [chosenTodo, setChosenTodo] = useState<Task| null>(null)
    const [newTitle, setNewTitle] = useState<string>('');

    // useQuery for fetching data
    const { data, isPending, isError} = useGetTasksQuery({initialTodos, userId});
    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error loading todos</div>;

    // useMutation for adding data
    const addMutation = useAddTasksMutation({userId, setChosenTodo, setNewTitle});
    
    const handleAddTask = () => {
        addMutation.mutate(newTitle); 
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