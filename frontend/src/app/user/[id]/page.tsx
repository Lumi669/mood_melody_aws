type User = {
  id: string;
  name: string;
  email: string;
};

async function getUser(id: string): Promise<User | undefined> {
  // Simulate fetching user data
  const users: User[] = [
    { id: "1", name: "rose", email: "aa@example.fi" },
    { id: "2", name: "rodfse", email: "akka@example.fi" },
    { id: "3", name: "rosgfgfge", email: "amma@example.fi" },
  ];

  // Find and return the user by ID
  return users.find((user) => user.id === id);
}

export default async function UserInfo({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
      </div>
    );
  }

  return (
    <>
      <h1>Information about user {params.id}</h1>
      <div>
        User name: {user.name}
        <br />
        User email: {user.email}
      </div>
    </>
  );
}
