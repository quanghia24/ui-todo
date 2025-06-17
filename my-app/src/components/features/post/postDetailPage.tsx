import { Post } from "@/types/types"

export default function PostDetailPage({
  post,
}: {
  post: Post,
}) {
  return (
    <>
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