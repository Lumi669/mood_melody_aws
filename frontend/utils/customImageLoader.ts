// utils/customImageLoader.ts

// customeLoader function that returns the image URL, otherwise the url is not the original url from aws s3 when using nextjs <Image>

export const customLoader = ({
  srcOfImageUrl,
}: {
  srcOfImageUrl: string | null;
}) => {
  if (!srcOfImageUrl) {
    throw new Error("Image URL is required"); // Or handle it in another way
  }
  return srcOfImageUrl;
};
