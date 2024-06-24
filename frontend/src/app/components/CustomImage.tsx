import React from "react";

import Image from "next/image";
import Head from "next/head";

import { customLoader } from "../utils/customImageLoader";

import { CustomImageProps } from "../types/type";

// const printText = () => {
//   console.log("hello this is test of image click");
// };

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  layout = "fill",
  objectFit = "cover",
  onClick,
}) => {
  console.log("src from CustomImage props === ", src);
  const preloadHref = customLoader({ srcOfImageUrl: src });

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={preloadHref} />
      </Head>

      <Image
        loader={() => customLoader({ srcOfImageUrl: src })}
        src={src}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        unoptimized // Disable optimization
        onClick={onClick}
      />
    </>
  );
};

export default CustomImage;
