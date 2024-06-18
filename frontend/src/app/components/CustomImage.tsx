import Image from "next/image";
import { customLoader } from "../utils/customImageLoader";

import { CustomImageProps } from "../types/type";

const printText = () => {
  console.log("hello this is test of image click");
};

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  layout = "fill",
  objectFit = "cover",
  onClick,
}) => {
  return (
    <Image
      loader={() => customLoader({ srcOfImageUrl: src })}
      src={src}
      alt={alt}
      layout={layout}
      objectFit={objectFit}
      unoptimized // Disable optimization
      onClick={onClick}
    />
  );
};

export default CustomImage;
