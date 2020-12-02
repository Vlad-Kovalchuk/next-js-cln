import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import passport from "../../lib/passport";
import extractUser from "../../lib/api-helpers";
import { Request, Response } from "../../types/ITemplates";

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate("local"), (req: Request, res: Response) => {
  // return our user object
  res.json({ user: extractUser(req) }); // interface IUser {user: any,}
});

handler.delete((req: Request, res: Response) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
