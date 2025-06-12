"use client"

import { Container, Typography } from '@mui/material';
import { redirect } from 'next/navigation';

export default function Home() { 
	const login = false;
	if (login) {
		redirect('/todos');
	}
	return ( 
		<Container>
			<Typography variant="h4">Welcome to the Home Page</Typography>
			<button className='border' onClick={() => {redirect('/login')}}>goto login</button>
		</Container>
	);
}
