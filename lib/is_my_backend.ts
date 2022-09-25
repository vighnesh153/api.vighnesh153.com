import { NextApiRequest } from 'next';
import { serverConfig } from '@config/server-config';

/**
 * Verifies if a request is from my another backend
 * @param req
 */
export async function isMyBackend(req: NextApiRequest) {
  const apiKey = req.headers[serverConfig.backend.apiKey.header];
  const isSame = apiKey === serverConfig.backend.apiKey.value;
  if (!isSame) {
    throw new Error('Not allowed...');
  }
}
