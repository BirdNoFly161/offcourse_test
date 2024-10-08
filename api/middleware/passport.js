import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import { secret, google_secret, google_client_id } from "../configs/environement.js";
import User from "../database/models/userSchema.js";

const cookieExtractor = function (req) {
  let token = null;
  if (req.cookies.token) {
    token = req.cookies.token;
    console.log("cookie jwt extractor found token in stored cookies");
  }
  return token;
};

let options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor,
  ]),
  secretOrKey: secret,
};

export default function passport_middleware(app) {
  passport.use(
    "user",
    new JwtStrategy(options, async function verify(jwt_payload, done) {
      try {
        let user = await User.findOne({ _id: jwt_payload._id });
        if (user) {
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
      console.log("from passport middleware, payload: ", jwt_payload);
      return done(null, false);
    }),
  );

  passport.use(new GoogleStrategy({
    clientID: google_client_id,
    clientSecret: google_secret,
    callbackURL: "https://offcourse-test-backend.vercel.app/users/register/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const newUser = await new User({
        googleId: profile.id,
        username: `user${profile.id}`,
        email: profile.email,
        name: profile.displayName,
      }).save();
      console.log(newUser)
      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
));


  app.use(passport.initialize());
  console.log("initialized passport middleware successfully");
}
