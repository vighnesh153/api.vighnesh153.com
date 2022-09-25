import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from '@lib/passport';
import { serverConfig } from '@config/server-config';
import expressSession from 'express-session';
import { serverUtils } from '@utils/server_utils';
import { User } from '@interfaces/User';

interface RequestUser {
  id: string;
  displayName: string;
  photos: { value: string }[];
}

const buildSerializableUser = (user: RequestUser): User => ({
  id: user.id,
  name: user.displayName,
  photo: user.photos.length > 0 ? user.photos[0].value : null,
  isAdmin: user.id === serverConfig.oauth.google.adminGoogleId,
});

export default nextConnect()
  .use(
    expressSession({
      resave: false,
      saveUninitialized: true,
      secret: serverConfig.cookies.secret,
    })
  )
  .use(passport.session())
  .get(
    passport.authenticate(serverConfig.oauth.google.strategyName),
    (req: NextApiRequest & { user: RequestUser }, res: NextApiResponse) => {
      // user
      const user = buildSerializableUser(req.user);

      // sets the cookies
      res.setHeader(
        'Set-Cookie',
        serverUtils.serializeCookies([
          {
            name: serverConfig.params.userToken,
            value: serverUtils.buildToken(user),
            options: {
              ...serverConfig.cookies.options,
              httpOnly: true,
            },
          },
        ])
      );

      res.send(`
        <p>Login successful. Redirecting...</p>
        <script>
          window.location.replace("${serverConfig.oauth.loginSuccess}")
        </script>
      `);
    }
  );
