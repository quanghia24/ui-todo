"use client"

import { useEffect, useState } from "react"

import { IconButton, TextareaAutosize, Divider, TextField, Card, CardActions, CardContent, Typography } from '@mui/material';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import FlagIcon from '@mui/icons-material/Flag';

import ActionButton from "@/components/common/ActionButton"
import { Task } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import { updateTask } from "@/db/queries/task.queries"

import { useQueryClient } from "@tanstack/react-query"

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
    const [priority, setPriority] = useState<number>((todo.urgent?1:0) + (todo.important?1:0)) 
    
    useEffect(() => {
        setTitle(todo.title)
        setDesc(todo.description)
    }, [todo.title, todo.description])
    
    const updatemutation = useMutation({
        mutationFn: (update: Task) => 
            updateTask(update.id, update.title, update.description, update.status, update.urgent, update.important),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', userId] });
        }
    })

    const handleUpdate = () => {
        const updatedTodo: Task = {
            ...todo,
            title: title,
            description: desc
        }
        updatemutation.mutate(updatedTodo)
    }

    const handlePriorityChange = (priority: number) => {
        let _urgent = false
        let _important = false

        if (priority == 1){
            _important = true
        } else if (priority == 2) {
            _urgent = true
        } else if (priority == 3) {
            _urgent = true
            _important = true
        }

        const updatedTodo: Task = {
            ...todo,
            urgent: _urgent,
            important: _important
        }
        updatemutation.mutate(updatedTodo)
        setPriority(priority)
    }

    return (
        <div className="w-[49%] flex flex-col ">
            <Card className="p-2 h-[87vh]">
                <CardContent>
                    <div className="flex justify-between items-center">
                        {/* most import */}
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
                </CardContent>
                {(title !== todo.title || desc !== todo.description) && <ActionButton handler={handleUpdate} mcolor="success" text="Save changes"/>}
            </Card>
        </div>
    )
}
