export default async function ContentPage ({ 
    params 
}: { 
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params
    return (

        <div>
            Post: {postId}
        </div>
    )
}