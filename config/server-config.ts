import { timeUtils } from '@utils/time_utils';

const missingConfig = () => {
  throw new Error('Missing required config');
};

const getOrigins = () => {
  const subdomains = (process.env.CORS_SUBDOMAINS ?? 'api,blog').split(',');
  return subdomains.map((subdomain) => `https://${subdomain}`);
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
      adminGoogleId: '104805950416859654834', // my google id
    },
  },
  cors: {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origins: getOrigins(),
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  csrf: {
    headerName: 'x-xsrf-vighnesh153',
  },
  cookies: {
    secret: process.env.COOKIE_SECRET ?? missingConfig(),
    options: {
      domain: process.env.COOKIE_DOMAIN ?? `vighnesh153.com`,
      path: '/',
      maxAge: timeUtils.yearsToSeconds(1),
    },
  },
  params: {
    userToken: 'user-token',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? missingConfig(),
  },
  backend: {
    apiKey: {
      header: 'vighnesh-api-key',
      value: process.env.VIGHNESH_API_KEY ?? ''
    },
  },
};
