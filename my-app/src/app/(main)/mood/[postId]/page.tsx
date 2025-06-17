import PostDetailPage from "@/components/features/post/postDetailPage";
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
          <PostDetailPage post={post}/>
        </>
    )
}