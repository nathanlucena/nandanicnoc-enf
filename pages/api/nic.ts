// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

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
  if (req.method === "POST") {
    const {
      name,
      blue,
      definition,
      interventions_nursing,
      interventions_optional,
    } = req.body;
    if (!name || !definition) {
      res.status(400).json({ error: "Tem algo faltando aí, meu chapa" });
      return;
    } else {
      const { db } = await connect();
      const response = await db.collection("Nic").insertOne({
        name,
        definition,
        blue,
        interventions_nursing,
        interventions_optional,
      });

      res.status(200).json(response.ops[0]);
    }
  } else if (req.method === "GET") {
    const { db } = await connect();
    const search = "/T/gi";
    const response: any = await db
      .collection("Nic")
      .find({ $or: [{ name: search }, { blue: search }] })
      .toArray();
    res.status(200).json(response);
  } else {
    res.status(400).json({ error: "Error" });
  }
};
