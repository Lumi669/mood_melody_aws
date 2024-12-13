import React from "react";
import Image from "next/image";

const Greeting = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0 p-4">
      <Image
        src="/dancing-girl-removebg.webp"
        alt="Description of the image"
        width={300}
        height={314}
        className="rounded-lg "
        priority
      />

      <h1 className="bg-yellow-100 text-2xl md:text-4xl font-mono text-[#1a9f4b] font-bold tracking-wide text-center p-4 rounded-lg">
        Hi there, How do you feel today :d?
      </h1>
    </div>
  );
};

export default Greeting;
