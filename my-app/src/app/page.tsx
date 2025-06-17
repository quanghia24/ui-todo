import { redirect } from 'next/navigation'; 
import { auth0 } from '@/lib/auth0';

export default async function Home() { 
	// fetch user session
	const session = await auth0.getSession(); 

	// no session the show sign-up & login
	if (!session) {
		return (
			<div className='w-full flex justify-center content-center bg-gray-50 '>
				<main className="flex min-h-screen flex-col items-center justify-center px-4">
					<div className="max-w-2xl text-center">
						<h1 className="text-5xl font-bold text-gray-900 mb-6">
							Stay Organized with <span className="text-blue-600">TodoMaster</span>
						</h1>
						<p className="text-lg text-gray-600 mb-8">
							A simple and powerful way to manage your tasks, stay productive, and get things done. Built for speed, clarity, and ease of use.
						</p>
						<a
							href="/todos"
							className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
						>
							Get Started
						</a>
					</div>

					<div className="mt-12">
						<img
							src="https://fruitfortheoffice.co.uk/media/catalog/product/cache/22f8b13a74fce530a016d5f78df80ce0/b/a/banana_each_500x500_.png"
							alt="Todo App Illustration"
							className="w-full max-w-md mx-auto"
						/>
					</div>
				</main>
			</div>
		);
	} 

	redirect('/todos')
}