"use client"

import { Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const login = true;
  if (login) {
    router.push('/todos');
  }
  return ( 
    <Container>
      <Typography variant="h4">Welcome to the Home Page</Typography>
    </Container>
  );
}
