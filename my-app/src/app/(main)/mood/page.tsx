import ListMoodPost from "@/components/features/post/listMoodPost";
import AddPostButton from "@/components/common/AddPostButton";
import { getAllPost } from "@/db/queries/post.queries"; 

export const revalidate = 30;

export default async function MoodPage() {
  const posts = await getAllPost(); 
  
  return (
    <div>
      {/* add post */} 
      <AddPostButton/>

      {/* show posts that generated at build and ISR (SSG)?? */}
      <ListMoodPost posts={posts} />
    </div>
  )
}
