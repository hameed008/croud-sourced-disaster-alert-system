import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        return user ? done(null, user) : done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

export default passportConfig;
