"use client"
import { Button } from "@mui/material";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() { 

	return (
		<>
			<h1>Login Page</h1>
			<Button onClick={loginAction} variant="contained">Login as user 1</Button>
		</>
	);
}