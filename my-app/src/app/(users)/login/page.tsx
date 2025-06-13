"use client"
import { Button } from "@mui/material";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() { 
	return (
		<div className="p-5 w-full flex justify-center items-center h-full">
			<div>
				<h1>Login Page</h1>
				<Button onClick={loginAction} variant="contained">Login as user 1</Button>
			</div>
		</div>
	);
}