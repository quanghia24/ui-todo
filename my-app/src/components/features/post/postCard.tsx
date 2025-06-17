import Link from "next/link"
import { Post } from "@/types/types"

export default function PostCard({
  post,
}: {
  post: Post,
}) {
  return (
    <li className="border-b pb-4">
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
  )
}