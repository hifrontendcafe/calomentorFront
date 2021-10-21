import { NextApiRequest, NextApiResponse } from "next";
import { getUserSchedule } from "@/lib/userAPI";
import { addNewTimeslot, deleteTimeslot } from "@/lib/timeslotAPI";

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
      const data = await getUserSchedule(query.id as string);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "An error has occurred" });
    }
  } else if (req.method === "POST") {
    const { body } = req;
    if (!body.date || !body.time) {
      return res.status(400).json({ message: "Date and time are required" });
    }
    try {
      const data = await addNewTimeslot(body.id, {
        date: body.date,
        time: body.time,
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "An error has occurred" });
    }
  } else if (req.method === "DELETE") {
    const { query } = req;
    if (!query.timeslotId) {
      return res.status(400).json({ message: "Timeslot id is required" });
    }
    try {
      const data = await deleteTimeslot(query.timeslotId as string);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "An error has occurred" });
    }
  }
  return res.status(500).json({ message: "Invalid method" });
}