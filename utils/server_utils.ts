import { CookieSerializeOptions, serialize } from 'cookie';
import * as crypto from 'crypto';

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
  buildHash(obj: any): string {
    // const salt = crypto.randomBytes(16).toString('hex');
    const salt = 'Vighnesh is awesome';
    return crypto.pbkdf2Sync(JSON.stringify(obj), salt, 10, 64, `sha512`).toString(`hex`);
  },
  verifyHash(obj: any, potentialHash: string): boolean {
    const hash = this.buildHash(obj);
    return hash === potentialHash;
  },
};
