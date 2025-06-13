import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Task } from '@/types/types';

export default function TaskCard({ 
    todo, 
    handleRemove,
    handleChosen,
}: { 
    todo: Task,
    handleRemove: (id: string) => void,
    handleChosen: (todo: Task) => void,
}) {
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();

        setContextMenu(
        contextMenu === null
            ? {
                mouseX: event.clientX + 2,
                mouseY: event.clientY - 6,
            }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null,
        );

        // Prevent text selection lost after opening the context menu on Safari and Firefox
        const selection = document.getSelection();
        if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        setTimeout(() => {
            selection.addRange(range);
        });
        }
    };

    const handleSelectRemove = () => {
        setContextMenu(null);
    };
    const handleSelectEdit = () => {
        setContextMenu(null);
    };


    return (
        <div className='w-full' onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
            <Typography className={`${todo.status?'text-gray-400':''}`}>
                {todo.title}
            </Typography>
            <Menu
                open={contextMenu !== null}
                onClose={() => {setContextMenu(null)}}
                anchorReference="anchorPosition"
                anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
            >
                <MenuItem onClick={handleSelectRemove}>Remove</MenuItem>
                <MenuItem onClick={handleSelectEdit}>Edit</MenuItem>
            </Menu>
        </div>
    );
}
