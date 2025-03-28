"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const USERS = gql`
  query {
    users {
      id
      firstname
      lastname
      email
      username
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstname
      lastname
      email
      username
    }
  }
`;

export function GetUsers() {
  const { data, loading, error } = useQuery(USERS);
  const [getUserById, { data: userDetail }] = useLazyQuery(GET_USER_BY_ID);

  const handleRowClick = (id) => {
    getUserById({ variables: { id } });
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <Table>
        <TableCaption>List of all the Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>FirstName</TableHead>
            <TableHead>LastName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.users.map((user, index) => (
            <TableRow
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              className="cursor-pointer hover:bg-gray-400"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              Total: {data.users.length} user(s)
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {userDetail?.user && (
        <div className="mt-6 border p-4 rounded bg-white shadow">
          <h2 className="text-lg font-bold">User Details</h2>
          <p>
            <strong>ID:</strong> {userDetail.user.id}
          </p>
          <p>
            <strong>Firstname:</strong> {userDetail.user.firstname}
          </p>{" "}
          <p>
            <strong>Lastname:</strong> {userDetail.user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {userDetail.user.email}
          </p>
          <p>
            <strong>Username:</strong> {userDetail.user.username}
          </p>
          <p>
            <strong>Password:</strong> {userDetail.user.password}
          </p>
        </div>
      )}
    </div>
  );
}
