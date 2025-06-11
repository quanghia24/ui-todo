"use client"

import { useQuery } from "@tanstack/react-query";
import { getAllTasksBelongToUserId } from "@/db/queries/task.queries";
import { Task } from "@/types/types";
import { todo } from "node:test";

export default function TodosList() {
    const userId = "ae235c5e-2032-4bec-a9e0-bbd15a43af08";

    const result = useQuery({
        queryKey: ['todos', userId],
        queryFn: () => getAllTasksBelongToUserId(userId), 
    });
    if (result.isPending) return <div>Loading...</div>;
    if (result.isError) return <div>Error loading todos</div>;
    
    return (
        <>
            {result.data.map((todo) => (
                <div className="border m-5" key={todo.id}>
                    <p>{todo.title}</p>
                </div>
            ))}
        </>
    );
}