// app/user/[id]/page.tsx
import UserProfileClient from "./helper/UserProfileClient";
import { generateStaticParams } from "./helper/userStaticParams";

export default function Page() {
  return <UserProfileClient />;
}

// Re-export the generateStaticParams function
export { generateStaticParams };
