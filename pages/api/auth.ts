// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {} from 'cookie';
import { serverUtils } from '../../utils/server_utils';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  serverUtils.setCookie(res, 'vighnesh', 'shreya', {
    domain: `vighnesh153.com`,
    path: '/',
  });

  res.status(200).json({ name: 'John Doe' });
}
