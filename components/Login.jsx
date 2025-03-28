import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $username: String!, $password: String!) {
    login(email: $email, username: $username, password: $password) {
      id
      email
      username
      password
    }
  }
`;

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ variables: { email, username, password } });
  };
  return (
    <div className=" flex justify-center  ">
      <Card className="w-[350px] shadow-xl flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="flex text-2xl justify-center text-center">
            Login
          </CardTitle>
          <CardDescription className="flex justify-center text-center">
            Welcome Back!!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your username "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-3">
              Login
            </Button>
          </form>
          <div className="mt-4">
            {loading && <p>Loading...</p>}
            {error && (
              <p className="text-white font-mono p-2 bg-red-600 rounded-2xl">
                {error.message}
              </p>
            )}
            {data && (
              <p className="text-white font-medium p-3 bg-emerald-600 rounded-2xl">
                welcome back {data.login.username}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
