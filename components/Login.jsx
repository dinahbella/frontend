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

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function Login() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ variables: { name, email } });
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <p className="text-white font-bold p-3 bg-red-600 rounded-2xl">
                {error.message}
              </p>
            )}
            {data && (
              <p className="text-white font-medium p-3 bg-emerald-600 rounded-2xl">
                User Created: {data.createUser.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
