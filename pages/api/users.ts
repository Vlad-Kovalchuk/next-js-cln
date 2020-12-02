import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import middleware from "../../middlewares/middleware";
import extractUser from "../../lib/api-helpers";
import { Request, Response } from "../../types/ITemplates";

const handler = nextConnect();

handler.use(middleware);

// POST /api/users
handler.post(async (req: Request, res: Response) => {
  const { name, password, password2 } = req.body;
  // normalize field (no dots, spaces etc)
  const email: string = normalizeEmail(req.body.email);
  // validation for forms
  if (!name || !email || !password2 || !password) {
    res.status(400).send("Missing field(s)");
    return;
  }
  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }
  if (password !== password2) {
    res.status(400).send("Passwords do not match");
    return;
  }
  if (password.length < 6) {
    res.status(400).send("Weak password (less than 6 chars)");
    return;
  }
  // check if email in DB
  if ((await req.db.collection("users").countDocuments({ email })) > 0) {
    res.status(403).send("The email has already been used.");
  }
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: string = await req.db
    .collection("users")
    .insertOne({ email, password: hashedPassword, name })
    .then(({ ops }) => ops[0]);
  req.logIn(user, (err) => {
    if (err) throw err;
    // when we finally log in, return user object
    res.status(201).json({
      user: extractUser(req),
    });
  });
});

export default handler;
