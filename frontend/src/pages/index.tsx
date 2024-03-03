// import Image from "next/image";
import { Inter } from "next/font/google";

// import Display from "../components/Display";
import Ui from "@/components/Ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>Happy weekend :D Sunday!</div>
      <Ui>Hello</Ui>
    </main>
  );
}
