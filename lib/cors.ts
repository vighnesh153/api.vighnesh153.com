import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { serverConfig } from '@config/server-config';

export async function handleCors(req: NextApiRequest, res: NextApiResponse) {
  return NextCors(req, res, {
    // Options
    methods: serverConfig.cors.methods,
    origin: serverConfig.cors.origins,
    optionsSuccessStatus: serverConfig.cors.optionsSuccessStatus,
  });
}
