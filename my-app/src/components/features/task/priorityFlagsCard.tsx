import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import FlagIcon from '@mui/icons-material/Flag';
import { CardContent, IconButton } from "@mui/material"

export default function PriorityFlagsCard ({
    priority,
    handlePriorityChange,
}: {
    priority: number,
    handlePriorityChange: (v: number) => void,
}) {
    return (
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
    )
}