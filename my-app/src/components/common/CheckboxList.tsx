"use client"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Task } from '@/types/types'; 

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTask, updateTask } from '@/db/queries/task.queries';

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
            const labelId = `checkbox-list-label-${todo.id}`;
            return (
            <ListItem
                key={todo.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveTask(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                }
                disablePadding
            >
                <ListItemButton role={undefined} onClick={() => {handler(todo)}} dense>
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
                <p className={`${todo.status?'text-gray-400':''} `}>{todo.title}</p>
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
    );
}
