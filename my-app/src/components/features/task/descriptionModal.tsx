"use client"

import { Divider, TextField, Card, CardContent } from '@mui/material'; 
import { useEffect, useState } from "react" 
import { useDebouncedCallback } from 'use-debounce';
import PriorityFlagsCard from '@/components/features/task/priorityFlagsCard';

import { Task } from "@/types/types"
import { useUpdateTasksMutation } from '@/lib/queries/tanstack.query';

export default function DescriptionModal ({ 
    todo, 
    userId 
}: { 
    todo: Task,
    userId: string
}) { 
    const [title, setTitle] = useState<string>(todo.title)
    const [desc, setDesc] = useState<string>(todo.description)
    const [priority, setPriority] = useState<number>((todo.urgent?2:0) + (todo.important?1:0)) 
    const updateMutation = useUpdateTasksMutation({ userId })
    
    const debouncedSave = useDebouncedCallback((taskToSave: Task) => {
        updateMutation.mutate(taskToSave);
    }, 800);
    // Cancel debounce if todo changes
    useEffect(() => {
        debouncedSave.cancel();
        setTitle(todo.title);
        setDesc(todo.description);
        setPriority((todo.urgent ? 2 : 0) + (todo.important ? 1 : 0));
    }, [todo.id]); // Only when todo changes

    // Save on input change
    useEffect(() => {
        debouncedSave({
            ...todo,
            title,
            description: desc,
            urgent: priority >= 2,
            important: priority % 2 === 1,
        });
    }, [title, desc, priority, todo, debouncedSave]);

    const handleUpdate = (p: number) => { 
        const updatedTodo: Task = {
            ...todo,
            title: title,
            description: desc,
            urgent: p >= 2,
            important: p % 2 == 1,
        }
        updateMutation.mutate(updatedTodo)
    }

    const handlePriorityChange = (value: number) => {
        setPriority(value);
        handleUpdate(value)
    }

    return (
        <div className="w-[49%] flex flex-col ">
            <Card className="p-2 h-[87vh]">
                <PriorityFlagsCard priority={priority} handlePriorityChange={handlePriorityChange} />
                
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
