// import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Ui from "@/components/Ui";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

interface Music {
  id: number;
  name: string;
  url: string;
  mood: boolean;
}

export default function Homepage() {
  const [data, setData] = useState<Music[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/musics");
        setData(response.data);
        console.log("data === ", data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    console.log("Updated data === ", data);
  }, [data]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>Happy weekend :D Sunday kkkk!</div>
      <Header />
      <Ui>Hello</Ui>
      <div>
        {data.map((item, index) => (
          <div key={index}>{item.id}</div>
        ))}
      </div>
    </main>
  );
}
