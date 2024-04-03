import type { NextApiRequest, NextApiResponse } from "next";

// backend endpoint
// const BACKEND_URL = "http://backend:4000/api/musics";
const BACKEND_URL =
  "https://mood-melody-backend-860ac0ad6346.herokuapp.com/api/musics";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("req from musics.tsx === ", req);
  console.log("res from musics.tsx === ", res);
  try {
    // Fetch data from the backend API
    const response = await fetch(BACKEND_URL, {
      method: "GET",
      headers: {
        // Add any headers your backend requires
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer TOKEN_HERE',
      },
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("data from musics.ts === ", data);

    // Send the data back to the client i.e .tsx file which is not inside api dir
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error ===" });
  }
}
