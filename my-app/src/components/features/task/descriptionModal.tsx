"use client"

import { IconButton, Divider, TextField, Card, CardContent } from '@mui/material';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import FlagIcon from '@mui/icons-material/Flag';
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query" 
import { useMutation } from "@tanstack/react-query"
import { useDebouncedCallback } from 'use-debounce';

import { updateTask } from "@/db/queries/task.queries"
import { Task } from "@/types/types"

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
    // Debounced save function to prevent excessive calls
    const debouncedSave = useDebouncedCallback((title: string, description: string) => {
        const updatedTodo: Task = {
            ...todo,
            title,
            description,
        }
        updatemutation.mutate(updatedTodo)
    }, 500);

    
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
                    <div className="flex justify-evenly items-center"> 
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
                    <form action={() => handleUpdate(priority)}>
                        <TextField
                            sx={{
                                mb: 2,
                                '& .MuiInputBase-input': {
                                    fontSize: '1.5rem', // Increase font size for input text
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.2rem', // Increase font size for label
                                },
                            }}
                            fullWidth
                            label="Title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => {debouncedSave(title, desc)}}               
                        />
                        {/* Description */}
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"  
                            multiline
                            fullWidth
                            rows={24}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}         
                            onBlur={() => {debouncedSave(title, desc)}}               
                        />
                    </form>
                </CardContent>
                <div className='flex justify-end'>
                    <p className="text-gray-500 italic font-extralight underline text-sm">Last update: {todo.updatedAt!.getDate()}/{todo.updatedAt!.getMonth()}</p>
                </div>

            </Card>
        </div>
    )
}
