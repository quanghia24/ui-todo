"use client"
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = () => {
    fetch('/api/users/login', {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Login failed');
      }
    }).then((data) => {
      console.log(data);
    })
  }

  return (
    <>
      <h1>Login Page</h1>
      <Button onClick={handleLogin} variant="contained">Login as user 1</Button>
    </>
  );
}