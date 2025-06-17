"use client"

import * as React from 'react';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox } from '@mui/material';

import { useRemoveTasksMutation, useUpdateTasksMutation } from '@/lib/queries/tasks.tanstack';
import TaskCard from '@/components/common/TaskCard';
import { Task } from '@/types/types'; 


export default function CheckboxList({ 
    data,
    handler,
    userId,
}: { 
    data: Task[] ,
    handler: (value: Task) => void,
    userId: string,
}) {
    // useMutation for removing data
    const removeMutation = useRemoveTasksMutation({ userId })
    
    // useMutation for updating data
    const updateMutation = useUpdateTasksMutation({ userId })

    const handleToggle = (todo: Task) => { 
        todo.status = !todo.status;
        updateMutation.mutate(todo)
    };

    const handleRemoveTask = (taskId: string) => {
        removeMutation.mutate(taskId);
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
