import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@interfaces/User';
import { serverConfig } from '@config/server-config';
import { serverUtils } from '@utils/server_utils';
import { handleCors } from '@lib/cors';
import { handleCsrf } from '@lib/csrf';

export default async function getUser(req: NextApiRequest, res: NextApiResponse<User | null>) {
  await handleCors(req, res);
  await handleCsrf(req, res);

  const tokenFromHeader = req.headers[serverConfig.params.userToken]?.toString();
  const tokenFromCookie = req.cookies[serverConfig.params.userToken];
  const userToken = tokenFromHeader ?? tokenFromCookie ?? '';
  const user = serverUtils.decodeToken(userToken);
  res.status(200).json(user);
}
