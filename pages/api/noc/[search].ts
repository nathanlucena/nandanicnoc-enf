// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../utils/database";

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: ObjectId;
  name: string;
  definition: string;
  blue: string[];
  interventions_nursing: string[];
  interventions_optional: string[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseType | ErrorResponseType>
): Promise<void> => {
  if (req.method === "GET") {
    const { db } = await connect();
    const { search } = req.query;
    const a = search.toString();
    const response: any = await db
      .collection("Noc")
      .find({ $or: [{ name: RegExp(a, "gi") }, { blue: RegExp(a, "gi") }] })
      .toArray();
    console.log(a);
    res.status(200).json(response);
  } else {
    res.status(400).json({ error: "Error" });
  }
};
