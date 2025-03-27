import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { Music, Image, MusicWithImage } from "../types/type";
import { apiUrls } from "../config/apiConfig";

const dynamoDbClient = new DynamoDBClient({ region: "eu-north-1" });
const TABLE_NAME = process.env.CACHE_TABLE_NAME;

console.log(
  "TTTTTT TABLE_NAME  from fetchAllMusicWithImages ====== ",
  TABLE_NAME,
);

console.log("aaaaa apiUrls from fetchAllMusicWithImages.ts ====== ", apiUrls);

// Function to get data from the cache
const getCache = async (key: string): Promise<MusicWithImage[] | null> => {
  const command = new GetItemCommand({
    TableName: TABLE_NAME,
    Key: { cacheKey: { S: key } },
  });

  try {
    const result = await dynamoDbClient.send(command);
    if (result.Item?.data?.S) {
      console.log("Cache hit for key from getCache 22222 ===== ", key);
      return JSON.parse(result.Item.data.S) as MusicWithImage[];
    }
    console.warn("Cache miss for key:", key);
    return null;
  } catch (err) {
    console.error("Error fetching from cache:", err);
    return null; // Gracefully handle cache fetch errors
  }
};

// Function to save data to the cache
const saveCache = async (
  key: string,
  data: MusicWithImage[],
  ttlSeconds: number,
): Promise<void> => {
  const ttl = Math.floor(Date.now() / 1000) + ttlSeconds; // Current time + TTL
  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: {
      cacheKey: { S: key },
      data: { S: JSON.stringify(data) },
      ttl: { N: ttl.toString() },
    },
  });

  try {
    await dynamoDbClient.send(command);
    console.log(`Cache saved to DynamoDB for key: ${key}`);
  } catch (err) {
    console.error("Error saving cache to DynamoDB:", err);
  }
};

// Main function to fetch music and images with caching
export const fetchAllMusicWithImages = async (): Promise<MusicWithImage[]> => {
  const CACHE_KEY = "music_with_images";

  try {
    console.log("Checking cache for key ====== ", CACHE_KEY);

    // Check cache first
    const cachedData = await getCache(CACHE_KEY);

    if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
      return cachedData;
    }

    // If no cache, fetch fresh data
    console.log("Cache miss. Fetching fresh data...");
    const [musicResponse, imageResponse] = await Promise.all([
      fetch(apiUrls.musics, { cache: "no-store" }),
      fetch(apiUrls.images, { cache: "no-store" }),
    ]);

    console.log(
      "Music API response status from fetchAllMusicWithImages.ts ===== ",
      musicResponse.status,
    );
    console.log(
      "Image API response status from fetchAllMusicWithImages.ts ====== ",
      imageResponse.status,
    );

    // Validate API responses
    if (!musicResponse.ok || !imageResponse.ok) {
      throw new Error(
        `API Error: Music - ${musicResponse.status}, Image - ${imageResponse.status}`,
      );
    }

    const musicData: Music[] = await musicResponse.json();
    const imageData: Image[] = await imageResponse.json();

    // Combine the data
    const matchedData: MusicWithImage[] = musicData.map((music) => {
      const matchingImage = imageData.find((img) => img.ctg === music.ctg);
      return { ...music, imgUrl: matchingImage?.url || "" };
    });

    // Save to cache with a long TTL since data does not change
    const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60; // 1 week

    console.log("Saving data to cache with key ====== ", CACHE_KEY);

    await saveCache(CACHE_KEY, matchedData, ONE_WEEK_IN_SECONDS);

    console.log(
      "Cache successfully saved to DynamoDB for key =====",
      CACHE_KEY,
    );

    return matchedData;
  } catch (error) {
    console.error("Error in fetchAllMusicWithImages:", error);

    // Fallback: Return an empty array or notify the user appropriately
    return [];
  }
};
