import { Container, Typography, Button } from '@mui/material';
import { redirect } from 'next/navigation';

import { auth0 } from '@/lib/auth0';
import ActionButton from '@/components/common/ActionButton';

export default async function Home() { 
	// const session = await auth0.getSession();
	// if (!session) {
	// 	return (
	// 		<main>
	// 			<a href="/auth/login?screen_hint=signup">
	// 			<button>Sign up</button>
	// 			</a>
	// 			<a href="/auth/login">
	// 			<button>Log in</button>
	// 			</a>
	// 		</main>
	// 	);
	// }
	return ( 
		<Container>
			<Typography variant="h4">Welcome to the Home Page</Typography>
			<div className='flex justify-between'> 
				{redirect('/login')}
				{/* <button className='border' onClick={() => {redirect('/auth/login')}}>Go to login page</button> */}
			</div>
		</Container>
	);
}
