import React from "react";
import Image from "next/image";

const Greeting = () => {
  return (
    <div>
      <div className="flex justify-center">
        {/* <video
          src="/animation-center-yellowbg-noblinking.mp4"
          autoPlay
          loop
          muted
          className="w-1/4 h-auto" // Adjust size and classes as needed
        /> */}

        {/* Use the Next.js Image component for optimized images */}
        <Image
          src="/dancing-girl-removebg.png"
          alt="Description of the image"
          width={300}
          height={300}
          className="rounded-lg"
        />

        <h1 className="m-10 p-20 bg-yellow-100 text-4xl font-mono text-green-500 font-bold tracking-wide text-center">
          Hi there, How do you feel today :D ?
        </h1>
      </div>
    </div>
  );
};

export default Greeting;
