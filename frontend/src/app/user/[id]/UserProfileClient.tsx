// app/user/[id]/UserProfileClient.tsx
"use client"; // This directive marks the file as a client component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

const UserProfileClient = () => {
  const params = useParams();
  const { id } = params as { id: string }; // Assert id as string

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchUserData(id)
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch user data");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
    </div>
  );
};

async function fetchUserData(id: string): Promise<User | null> {
  // const response = await fetch(`http://localhost:3001/api/user/${id}`);
  // if (!response.ok) return null;
  // const user = await response.json();
  // return user;
  return { id: "2", name: "rose", email: "aa@example.fi" };
}

export default UserProfileClient;
