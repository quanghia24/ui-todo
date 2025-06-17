import { getAllPost, getPostById } from "@/db/queries/post.queries"

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getAllPost(); 

  return posts.map((post) => ({
    postId: String(post.id)
  }))
}

export default async function ContentPage ({ 
    params 
}: { 
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params;
		const post = await getPostById(postId); 
    if (!post) return <div>Post not found</div>;
    return (
        <>
          PostId: {postId} 
          <div className="flex flex-col items-center">
            <time className="text-sm text-gray-600">
              {new Date(post.createdAt!).toLocaleDateString()}
            </time>
            <h2 className="border-b-2 text-2xl font-semibold">{post.title!}</h2>
          </div>
          <div className="mt-2 text-gray-700 overflow-ellipsis">
            {post.description}
          </div>
        </>
    )
}