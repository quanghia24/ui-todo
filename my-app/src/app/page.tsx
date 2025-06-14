import { Container, Typography, Button } from '@mui/material';
import { redirect } from 'next/navigation';

import ActionButton from '@/components/common/ActionButton';
import { auth0 } from '@/lib/auth0';

export default async function Home() { 
	// fetch user session
	const session = await auth0.getSession();

	// no session the show sign-up & login
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

	// if session exists, show welcome and logout button
	return ( 
		<main>
			<h1>Welcome, {session.user.name}</h1>
			<p>
				<a href="/auth/logout">
					<button>Log out</button>
				</a>
			</p>
		</main>
		// <Container>
		// 	<Typography variant="h4">Welcome to the Home Page</Typography>
		// 	<div className='flex justify-between'> 
		// 		{redirect('/login')}
		// 	</div>
		// </Container> 
	);
}
