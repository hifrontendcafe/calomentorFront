import { NextApiRequest, NextApiResponse } from "next";
import { getUserByID, getUsers, updateUserByID } from "@/lib/userAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { query } = req;
    if (!query.id) {
      try {
        const data = await getUsers();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: "An error has occurred" });
      }
    }
    try {
      const data = await getUserByID(query.id as string);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "An error has occurred" });
    }
  } else if (req.method === "PUT") {
    const { body } = req;
    if (!body.data.id || !body.data) {
      return res.status(400).json({ message: "ID and data required" });
    }
    try {
      const id = body.data.id;
      delete body.data["id"];
      const data = await updateUserByID(id, body.data);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "An error has occurred" });
    }
  }
  return res.status(500).json({ message: "Invalid method" });
}
