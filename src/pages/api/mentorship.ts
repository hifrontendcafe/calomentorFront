import { NextApiRequest, NextApiResponse } from "next";
import { getUserMentorships } from "@/lib/mentorshipAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { query } = req;
    if (!query.id) {
      return res.status(400).json({ message: "ID is required" });
    }
    try {
      const data = await getUserMentorships(query.id as string);
      return res.status(200).json(data);
    } catch (error) {
      if (error.message === "404") {
        return res.status(200).json({ data: [] });
      }
      return res.status(500).json({ message: "An error has occurred" });
    }
  }
  return res.status(500).json({ message: "Invalid method" });
}
