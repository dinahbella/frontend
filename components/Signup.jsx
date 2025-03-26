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

const SIGN_UP = gql`
  mutation SignUp(
    $firstname: String!
    $lastname: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    signup(
      firstname: $firstname
      lastname: $lastname
      email: $email
      username: $username
      password: $password
    ) {
      id
      firstname
      lastname
      email
      username
    }
  }
`;

export default function SignUp() {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({
      variables: { firstname, lastname, email, username, password },
    });
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[350px] shadow-xl flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="firstname">Firstname</Label>
                <Input
                  id="firstname"
                  placeholder="Enter your firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="lastname">Lastname</Label>
                <Input
                  id="lastname"
                  placeholder="Enter your lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-3">
              Sign Up
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
                {data.signup.username} created account successfully
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
