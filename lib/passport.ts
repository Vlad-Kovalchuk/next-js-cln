import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { ObjectId } from "mongodb";

passport.serializeUser((user, done) => {
  /* eslint-disable */
  done(null, user._id.toString());
  /* eslint-enable */
});

passport.deserializeUser((req, id, done) => {
  req.db
    .collection("users")
    .findOne(ObjectId(id))
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      // User search in DB
      const user = await req.db.collection("users").findOne({ email });
      if (user && (await bcrypt.compare(password, user.password)))
        done(null, user);
      else done(null, false);
    }
  )
);

export default passport;
