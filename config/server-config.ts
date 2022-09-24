import {timeUtils} from '@utils/time_utils';

const missingConfig = () => {
  throw new Error('Missing required config');
};

export const serverConfig = {
  oauth: {
    loginSuccess: `${process.env.MY_HOST_URL ?? missingConfig()}/auth/success`,
    google: {
      strategyName: 'google',
      scope: ['profile'],
      clientId: process.env.GOOGLE_CLIENT_ID ?? missingConfig(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? missingConfig(),
      callbackUrl: `${process.env.MY_HOST_URL ?? missingConfig()}/api/auth/google/callback`,
    },
  },
  cookies: {
    secret: process.env.COOKIE_SECRET ?? missingConfig(),
    options: {
      domain: process.env.COOKIE_DOMAIN ?? `vighnesh153.com`,
      path: '/',
      maxAge: timeUtils.yearsToSeconds(1),
      // sameSite: 'lax' as const,
    },
  },
  params: {
    userCookie: 'user',
    userTokenCookie: 'userToken',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? missingConfig(),
  },
};
