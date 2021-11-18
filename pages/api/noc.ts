// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

interface ErrorResponseType {
  error: string;
}

interface Indications {
  idInd: string;
  text: string;
}

interface SuccessResponseType {
  _id: ObjectId;
  name: string;
  code: string;
  definiton: string;
  indications: Indications[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseType | ErrorResponseType>
): Promise<void> => {
  if (req.method === "POST") {
    const { name, code, definiton, indications } = req.body;
    if (!name || !code || !definiton) {
      res.status(400).json({ error: "Tem algo faltando aí, meu chapa" });
      return;
    } else {
      const { db } = await connect();
      const response = await db.collection("Noc").insertOne({
        name,
        code,
        definiton,
        indications,
      });

      res.status(200).json(response.ops[0]);
    }
  } else if (req.method === "GET") {
    const { db } = await connect();

    const response: any = await db
      .collection("Noc")
      .find({ name: /T/ } || { blue: /T/ })
      .toArray();

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: "Feio" });
  }
};
