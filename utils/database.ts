// import { Db, MongoClient } from "mongodb";

// interface ConnectType {
//   db: Db;
//   client: MongoClient;
// }

// const client = new MongoClient(`${process.env.KEY}` || "", {
//   useNewUrlParser: true,
// });

// export default async function connect(): Promise<ConnectType> {
//   if (!client.isConnected()) await client.connect();

//   const db = client.db("Enfermagem");
//   return { db, client };
// }

import { MongoClient, Db } from "mongodb";

interface ConnectType {
  db: Db;
  client: MongoClient;
}

const client = new MongoClient(process.env.KEY || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect(): Promise<ConnectType> {
  if (!client.isConnected()) await client.connect();

  const db = client.db("Enfermagem");
  return { db, client };
}
