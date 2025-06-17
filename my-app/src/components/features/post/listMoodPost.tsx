
import { Post } from "@/types/types";
import Link from "next/link";

export default async function ListMoodPost({
  posts, 
}: {
  posts: Post[], 
}) {

  return (
    <main className="mx-auto max-w-4xl py-6 px-6"> 
      <h1 className="text-4xl font-bold mb-8 text-center">
        How is everyone feeling today?
      </h1>
      {/* main content */}
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <Link href={`/mood/${post.id}`} className="hover:text-blue-600">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <time className="text-sm text-gray-600">
                {new Date(post.createdAt!).toLocaleString()}
              </time>
              <div className="mt-2 text-gray-700 overflow-ellipsis">
                {post.description}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
