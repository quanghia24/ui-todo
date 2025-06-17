
import { Post } from "@/types/types"; 
import PostCard from "./postCard";

export default async function ListMoodPost({
  posts, 
}: {
  posts: Post[], 
}) {

  return (
    <main className="mx-auto max-w-4xl py-6 px-6"> 
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        How is everyone feeling today?
      </h1>
      {/* Main content */}
      <ul className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post}/>
        ))}
      </ul>
    </main>
  );
}
