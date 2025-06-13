"use client"

import * as React from 'react';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeTask, updateTask } from '@/db/queries/task.queries';
import { Task } from '@/types/types'; 
import TaskCard from '@/components/common/TaskCard';


export default function CheckboxList({ 
    data,
    handler,
    userId,
}: { 
    data: Task[] ,
    handler: (value: Task) => void,
    userId: string,
}) {
    const queryClient = useQueryClient(); 

    const removemutation = useMutation({
        mutationFn: (taskId: string) => removeTask(taskId),
        onSuccess: (taskId) => {
            queryClient.invalidateQueries({ queryKey: ['todos', userId] });
            console.log(`Task with ID ${taskId} removed by user ${userId}`);

        },
    })

    const updatemutation = useMutation({
        mutationFn: (update: Task) => 
            updateTask(update.id, update.title, update.description, update.status, update.urgent, update.important),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', userId] });
        }
    })

    const handleToggle = (todo: Task) => { 
        todo.status = !todo.status;
        updatemutation.mutate(todo)
    };

    const handleRemoveTask = (taskId: string) => {
        removemutation.mutate(taskId);
    }

    return (
        <List 
            sx={{ 
                width: '100%',  
                bgcolor: 'background.paper' 
            }}
        >
        {data.map((todo) => { 
            return (
            <ListItem
                key={todo.id}
                disablePadding
                className={`
                    rounded-lg
                    mb-0.5
                    ${!todo.status && todo.urgent && todo.important?'bg-red-200':''}
                    ${!todo.status && todo.urgent && !todo.important?'bg-yellow-200':''}
                    ${!todo.status && !todo.urgent && todo.important?'bg-blue-200':''}
                    ${!todo.status && !todo.urgent && !todo.important?'bg-gray-200':''}
                `}
            >
                <ListItemButton  role={undefined} onClick={() => {handler(todo)}} dense>                   
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={todo.status}
                            tabIndex={-1}
                            disableRipple 
                            color='default'
                            onClick={() => handleToggle(todo)}
                        />
                    </ListItemIcon> 
                    <TaskCard todo={todo} handleRemove={handleRemoveTask} handleChosen={handler}/>
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
    );
}
