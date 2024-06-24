// app/user/[id]/userStaticParams.ts
export async function generateStaticParams() {
  // // Fetch a list of user IDs that you want to pre-render
  // const response = await fetch('http://localhost:3001/api/users'); // Adjust the endpoint as needed
  // const users = await response.json();

  // // Return the paths that should be statically generated
  // return users.map((user: { id: string }) => ({
  //   id: user.id,
  // }));
  return [
    { id: "1", name: "rose", email: "aa@example.fi" },
    { id: "2", name: "rodfse", email: "akka@example.fi" },
    { id: "3", name: "rosgfgfge", email: "amma@example.fi" },
  ];
}
