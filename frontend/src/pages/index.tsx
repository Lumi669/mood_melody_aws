// import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Ui from "@/components/Ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);

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
  }, []);

  useEffect(() => {
    console.log("Updated data === ", data);
  }, [data]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>Happy weekend :D Sunday kkkk!</div>
      <Ui>Hello</Ui>
      <div>
        {data.map((item, index) => (
          <div key={index}>{item.id}</div>
        ))}
      </div>
    </main>
  );
}
