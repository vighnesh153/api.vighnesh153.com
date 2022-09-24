import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { serverConfig } from '@config/server-config';

passport.use(
  serverConfig.oauth.google.strategyName,
  new GoogleStrategy(
    {
      clientID: serverConfig.oauth.google.clientId,
      clientSecret: serverConfig.oauth.google.clientSecret,
      callbackURL: serverConfig.oauth.google.callbackUrl,
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  return cb(null, user);
});

passport.deserializeUser((user: any, cb) => {
  return cb(null, user);
});
