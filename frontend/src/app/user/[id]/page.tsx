// app/user/[id]/page.tsx
import UserProfileClient from "./UserProfileClient";
import { generateStaticParams } from "./userStaticParams";

export default function Page() {
  return <UserProfileClient />;
}

// Re-export the generateStaticParams function
export { generateStaticParams };
