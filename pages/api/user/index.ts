import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";
import extractUser from "../../../lib/api-helpers";
import { Request, Response } from "../../../types/ITemplates";

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req: Request, res: Response) =>
  res.json({ user: extractUser(req) })
);

export default handler;
