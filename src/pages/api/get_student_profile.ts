import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.ORB_API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }

  const { student_id } = req.body as { student_id: string };

  if (!student_id) {
    return res.status(400).json({ error: "Missing Student ID" });
  }

  try {
    const studentProfile = await db.studentProfile.findUnique({
      where: { userId: student_id },
      include: { user: true },
    });

    return res.status(200).json({ success: true, studentProfile });
  } catch (error) {
    return res.status(404).json({
      error: "Student not found",
    });
  }
}
