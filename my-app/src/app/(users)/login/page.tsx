"use client"
import { Button } from "@mui/material";
import { loginAction } from "@/app/actions/task";

export default function LoginPage() {
	// const router = useRouter();
	// const handleLogin = () => {
	//   fetch('/api/users/login', {
	//     method: 'GET',
	//   }).then((res) => {
	//     if (res.ok) {
	//       return res.json();
	//     } else {
	//       throw new Error('Login failed');
	//     }
	//   }).then((data) => {
	//     console.log(data);
	//   })
	// }

	return (
		<>
			<h1>Login Page</h1>
			<Button onClick={loginAction} variant="contained">Login as user 1</Button>
		</>
	);
}