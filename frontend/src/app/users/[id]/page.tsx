import React from "react";

type User = {
  name: string;
  age: number;
  hobby: string;
  id: number;
};

const users: User[] = [
  {
    name: "rose",
    age: 12,
    hobby: "dance",
    id: 1,
  },
  {
    name: "ben",
    age: 88,
    hobby: "swim",
    id: 2,
  },
  {
    name: "minne",
    age: 69,
    hobby: "run",
    id: 3,
  },
];

export default function UserComponent({ params }: { params: { id: string } }) {
  console.log("params === ", params);
  const userId = parseInt(params.id, 10);
  const user = users.find((user) => user.id === userId);
  console.log("user === ", user);

  if (!user) {
    return <div>User not found====</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Hobby: {user.hobby}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}
