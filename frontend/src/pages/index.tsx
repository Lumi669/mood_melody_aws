// import Image from "next/image";
import { Inter } from "next/font/google";

// import Display from '../components/Display';
import Display from "@/components/Display";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>Happy weekend :D Satuday !</div>
      <Display>Hello</Display>
    </main>
  );
}
