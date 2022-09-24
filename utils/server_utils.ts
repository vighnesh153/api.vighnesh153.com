import { CookieSerializeOptions, serialize } from 'cookie';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { serverConfig } from '@config/server-config';

export interface MyCookie {
  name: string;
  value: unknown;
  options?: CookieSerializeOptions;
}

export const serverUtils = {
  serializeCookies(cookies: MyCookie[]): string[] {
    const serializedCookies: string[] = [];

    cookies.forEach(({ name, value, options = {} }) => {
      const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

      if (typeof options.maxAge === 'number') {
        options.expires = new Date(Date.now() + options.maxAge * 1000);
      }

      serializedCookies.push(serialize(name, stringValue, options));
    });

    return serializedCookies;
  },
  buildToken(obj: any): string {
    return jwt.sign(obj, serverConfig.jwt.secret);
  },
  verifyToken(obj: any, potentialToken: string): boolean {
    const token = this.buildToken(obj);
    return token === potentialToken;
  },
};
