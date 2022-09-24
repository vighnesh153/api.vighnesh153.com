import passport from '@lib/passport';
import nextConnect from 'next-connect';
import { serverConfig } from '@config/server-config';

export default nextConnect()
  .use(passport.initialize())
  .get(
    passport.authenticate(serverConfig.oauth.google.strategyName, {
      scope: serverConfig.oauth.google.scope,
    })
  );
