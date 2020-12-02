import { MongoClient } from "mongodb";
import { Request } from "../types/ITemplates";

// Hardcoded URI
const client = new MongoClient(
  "mongodb+srv://admin:admin@cluster0.za4li.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export default async function database(
  req: Request,
  res: Response,
  next: () => void
): Promise<void> {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.DB_NAME);
  return next();
}
