import { Container, Typography } from '@mui/material';
import { redirect } from 'next/navigation';

import { auth0 } from '@/lib/auth0';

export default async function Home() { 
	const session = await auth0.getSession();
	if (!session) {
		return (
			<main>
				<a href="/auth/login?screen_hint=signup">
				<button>Sign up</button>
				</a>
				<a href="/auth/login">
				<button>Log in</button>
				</a>
			</main>
		);
	}
	return ( 
		<Container>
			<Typography variant="h4">Welcome to the Home Page</Typography>
			<div className='flex justify-evenly'>
				<button className='border' onClick={() => {redirect('/login')}}>Login with auth0</button>
				<button className='border' onClick={() => {redirect('/auth/login')}}>Login in quote</button>
				<a  href="/auth/login">{"[login]"}</a>
			</div>
		</Container>
	);
}
