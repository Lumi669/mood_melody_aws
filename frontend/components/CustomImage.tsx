"use client";

import React from "react";

import Image from "next/image";

import { customLoader } from "../utils/customImageLoader";

import { CustomImageProps } from "../types/type";

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  layout,
  objectFit,
  onClick,
  dataUrl,
  width,
  height,
  className,
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    if (onClick) {
      onClick(dataUrl || ""); // Ensure dataUrl is always a string
    }
  };

  return (
    <Image
      loader={() => customLoader({ srcOfImageUrl: src })}
      src={src}
      alt={alt}
      layout={layout}
      objectFit={objectFit}
      unoptimized // Disable optimization
      onClick={onClick ? handleClick : undefined}
      data-url={dataUrl}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default CustomImage;
