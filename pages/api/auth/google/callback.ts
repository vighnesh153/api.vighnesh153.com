import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from '@lib/passport';
import { serverConfig } from '@config/server-config';
import expressSession from 'express-session';
import { serverUtils } from '@utils/server_utils';
import { User } from '@interfaces/User';
import { NextResponse } from 'next/server';

interface RequestUser {
  id: string;
  displayName: string;
  photos: { value: string }[];
}

const buildSerializableUser = (user: RequestUser): User => ({
  id: user.id,
  name: user.displayName,
  photo: user.photos.length > 0 ? user.photos[0].value : null,
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

      /**
       * Create a Redirect instance to loginSuccess
       *
       * @see https://github.com/vercel/next.js/issues/32424
       */
      // const res = NextResponse.redirect(serverConfig.oauth.loginSuccess);

      // sets the cookies

      //.redirect(serverConfig.oauth.loginSuccess)

      res.setHeader(
        'Set-Cookie',
        serverUtils.serializeCookies([
          {
            name: serverConfig.params.userCookie,
            value: user,
            options: {
              ...serverConfig.cookies.options,
            },
          },
          {
            name: serverConfig.params.userTokenCookie,
            value: serverUtils.buildToken(user),
            options: {
              ...serverConfig.cookies.options,
              httpOnly: true,
            },
          },
        ])
      );

      res.send(`
        <h1>Login successful. Redirecting...</h1>
        <script>
          window.location.replace("${serverConfig.oauth.loginSuccess}")
        </script>
      `);
    }
  );
