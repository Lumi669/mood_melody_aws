import Image from "next/image";
import { customLoader } from "../utils/customImageLoader";

import { CustomImageProps } from "../types/type";

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  layout = "fill",
  objectFit = "cover",
}) => {
  return (
    <Image
      loader={() => customLoader({ srcOfImageUrl: src })}
      src={src}
      alt={alt}
      layout={layout}
      objectFit={objectFit}
      unoptimized // Disable optimization
    />
  );
};

export default CustomImage;
