import { session, promisifyStore, Store, MemoryStore } from "next-session";
import connectMongo from "connect-mongo";
import { Request } from "../types/ITemplates";

const MongoStore = connectMongo({ Store, MemoryStore });

export default function MongoSession(
  req: Request,
  res: Response,
  next: () => void
): void {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    store: promisifyStore(mongoStore),
  })(req, res, next);
}
