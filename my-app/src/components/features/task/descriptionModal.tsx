import { Task } from "@/types/types"

export default function DescriptionModal ({ todo }: { todo: Task }) {
    return (
        <div className="border w-[50%]">
            <p>description goes here</p>
            {todo.description}
        </div>
    )
}

//  <div className="border w-[50%]">
//                 <p>{todos}</p>
//                 {/* Displace todo list to the main page */}
//                 <TextField fullWidth id="inputNewTask" label="Input New Task" variant="outlined" />
//                 {userId && <TodosList initialTodos={todos} userId={userId}/>}
//             </div> 