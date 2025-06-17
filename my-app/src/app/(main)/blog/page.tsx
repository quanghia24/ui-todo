

export default function BlogPage () {
    return (
        <main className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">Let's see how everyone doing so far</h1>
            {/* <ul className="space-y-8">
                {posts.map((post) => (
                <li key={post.slug} className="border-b pb-4">
                    <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                    <h2 className="text-2xl font-semibold">{post.title}</h2>
                    <time className="text-sm text-gray-600">
                        {new Date(post.date).toLocaleDateString()}
                    </time>
                    <p className="mt-2 text-gray-700">{post.summary}</p>
                    </Link>
                </li>
                ))}
            </ul> */}
        </main>
    );
}