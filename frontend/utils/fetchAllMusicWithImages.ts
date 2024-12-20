import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { Music, Image, MusicWithImage } from "../types/type";
import { apiUrls } from "../config/apiConfig";

const dynamoDbClient = new DynamoDBClient({ region: "eu-north-1" });
const TABLE_NAME = "MusicCache";

// Function to get data from the cache
const getCache = async (key: string): Promise<MusicWithImage[] | null> => {
  const command = new GetItemCommand({
    TableName: TABLE_NAME,
    Key: { cacheKey: { S: key } },
  });

  try {
    const result = await dynamoDbClient.send(command);
    if (result.Item?.data?.S) {
      console.log("Cache hit for key:", key);
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
    // Check cache first
    const cachedData = await getCache(CACHE_KEY);
    if (cachedData) {
      return cachedData;
    }

    // If no cache, fetch fresh data
    console.log("Fetching fresh data from APIs...");
    const [musicResponse, imageResponse] = await Promise.all([
      fetch(apiUrls.musics),
      fetch(apiUrls.images),
    ]);

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
    await saveCache(CACHE_KEY, matchedData, ONE_WEEK_IN_SECONDS);

    return matchedData;
  } catch (error) {
    console.error("Error fetching data:", error);

    // Fallback: Return an empty array or notify the user appropriately
    return [];
  }
};
