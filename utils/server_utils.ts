import { CookieSerializeOptions, serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { serverConfig } from '@config/server-config';
import { User } from '@interfaces/User';

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
  decodeToken(token: string): User | null {
    try {
      const payload = jwt.verify(token, serverConfig.jwt.secret) as any;
      return {
        id: payload.id,
        name: payload.name,
        photo: payload.photo,
        isAdmin: payload.id === serverConfig.oauth.google.adminGoogleId,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
