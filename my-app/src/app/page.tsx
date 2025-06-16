import { Button } from '@mui/material';
import { auth0 } from '@/lib/auth0';


export default async function Home() { 
	// fetch user session
	const session = await auth0.getSession();

	// no session the show sign-up & login
	if (!session) {
		return (
			<div className='w-full flex justify-center content-center'>
				<div className='border w-[50vw]'>
					<div className='font-bold items-center flex flex-col'>
						<p>Welcome user!</p>
						<p>This is your home page, pls login to use our services.</p>
					</div>
					<div className='flex justify-evenly p-2'>
						<a href="/auth/login?screen_hint=signup">
							<Button variant='contained'>Sign up</Button>
						</a>
						<a href="/auth/login">
							<Button variant='contained' >Login</Button>
						</a>
					</div>
				</div>
			</div>
		);
	} 

	return (
		<a href="/todos">Goto the app</a>
	);
}