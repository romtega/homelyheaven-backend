import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

async function listDatabases() {
  const uri = process.env.DB_CONNECT_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  } catch (error) {
    console.error("Error listing databases:", error);
  } finally {
    await client.close();
  }
}

listDatabases();
