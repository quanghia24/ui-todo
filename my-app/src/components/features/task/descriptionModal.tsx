"use client"

import { useEffect, useState } from "react"
import { IconButton, Divider, TextField, Card, CardContent } from '@mui/material';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import FlagIcon from '@mui/icons-material/Flag';
import { useQueryClient } from "@tanstack/react-query" 
import { useMutation } from "@tanstack/react-query"

import { updateTask } from "@/db/queries/task.queries"
import { Task } from "@/types/types"
import ActionButton from "@/components/common/ActionButton"


export default function DescriptionModal ({ 
    todo, 
    userId 
}: { 
    todo: Task,
    userId: string}
) {
    const queryClient = useQueryClient()
    const [title, setTitle] = useState<string>(todo.title)
    const [desc, setDesc] = useState<string>(todo.description)
    const [priority, setPriority] = useState<number>((todo.urgent?2:0) + (todo.important?1:0)) 
    
    useEffect(() => {
        setTitle(todo.title)
        setDesc(todo.description) 
        setPriority((todo.urgent?2:0) + (todo.important?1:0))
    }, [todo])
    
    const updatemutation = useMutation({
        mutationFn: (update: Task) => 
            updateTask(update.id, update.title, update.description, update.status, update.urgent, update.important),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', userId] });
        }
    })

    const handleUpdate = (p: number) => { 
        const updatedTodo: Task = {
            ...todo,
            title: title,
            description: desc,
            urgent: p >= 2,
            important: p % 2 == 1,
        }
        updatemutation.mutate(updatedTodo)
    }

    const handlePriorityChange = (value: number) => {
        setPriority(value);
        handleUpdate(value)
    }

    return (
        <div className="w-[49%] flex flex-col ">
            <Card className="p-2 h-[87vh]">
                <CardContent>
                    <div className="flex justify-between items-center">
                        {/* <p>imported todo:</p>
                        <ul>
                            <li>u: {todo.urgent?"true":"false"}</li>
                            <li>i: {todo.important?"true":"false"}</li>
                        </ul>
                        <p>local todo's data:</p>
                        <ul>
                            <li>u: {urgent?"true":"false"}</li>
                            <li>i: {important?"true":"false"}</li>
                        </ul>
                        {/* Priority */}
                        <p>Priority: {priority}</p> 
                        <IconButton onClick={() => handlePriorityChange(3)}>
                            <FlagIcon sx={{ verticalAlign: 'middle', color: `${priority==3? 'red':'gray'}` }}/>
                        </IconButton>
                        <IconButton onClick={() => handlePriorityChange(2)}>
                            <FlagIcon sx={{ verticalAlign: 'middle', color: `${priority==2? 'orange':'gray'}` }}/>
                        </IconButton>
                        <IconButton onClick={() => handlePriorityChange(1)}>
                            <FlagIcon sx={{ verticalAlign: 'middle', color: `${priority==1? 'blue':'gray'}` }}/>
                        </IconButton>
                        <IconButton onClick={() => handlePriorityChange(0)}>
                            {!priority? <OutlinedFlagIcon sx={{ verticalAlign: 'middle'}}/>: <FlagIcon sx={{ verticalAlign: 'middle', color: 'gray' }}/>}
                        </IconButton>
                    </div>
                </CardContent>
                <Divider orientation="horizontal"/>    
                <CardContent>
                    {/* Title */}
                    <TextField sx={{ mb: 2 }} fullWidth label="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>

                    {/* Description */}
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"  
                        multiline
                        fullWidth
                        rows={23}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}                        
                    />
                    <p className="text-gray-500 italic font-extralight underline text-sm">Last update: {todo.updatedAt!.getDate()}/{todo.updatedAt!.getMonth()}</p>
                </CardContent>

                {/* Save button */}
                {(title !== todo.title || desc !== todo.description) && <ActionButton handler={() => handleUpdate(priority)} mcolor="inherit" text="Save changes"/>}
            </Card>
        </div>
    )
}
