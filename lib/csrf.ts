import { NextApiRequest, NextApiResponse } from 'next';
import { serverConfig } from '@config/server-config';

export async function handleCsrf(req: NextApiRequest, res: NextApiResponse) {
  const xsrfToken = req.headers[serverConfig.csrf.headerName]?.toString() ?? '';
  if (!xsrfToken.trim()) {
    throw new Error('CSRF attack protection...');
  }
}
