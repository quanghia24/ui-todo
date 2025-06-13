"use client"
import { Button } from "@mui/material";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() { 

	return (
		<div className="flex flex-col justify-center">
			<h1>Login Page</h1>
			<Button onClick={loginAction} variant="contained">Login as user 1</Button>
		</div>
	);
}