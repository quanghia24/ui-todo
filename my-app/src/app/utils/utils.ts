export function WriteJSON(status: number, message: any) {
    return new Response(JSON.stringify({ message }), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
};