import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import { Request, Response } from "../../types/ITemplates";
import { IEvent } from "../../components/MyCalendar";

const handler = nextConnect();

handler.use(middleware);

// POST /api/events
handler.post(async (req: Request, res: Response) => {
  await req.db.collection(`${req.user.email}`).deleteMany();
  if (req.body[0].title) {
    req.db.collection(`${req.user.email}`).insertMany(req.body);
  }
  res.status(200).json({});
});

// GET /api/events
handler.get(async (req: Request, res: Response) => {
  const itemsList: IEvent[] = await req.db
    .collection(`${req.user.email}`)
    .find({})
    .toArray();
  res.send({ itemsList });
});

export default handler;
