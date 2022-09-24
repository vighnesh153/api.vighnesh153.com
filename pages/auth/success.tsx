import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { clientConfig } from '@config/client-config';
import Cookies from 'js-cookie';

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const redirectUrl = localStorage.getItem(clientConfig.redirectUrlParam) ?? clientConfig.defaultRedirectUrl;
    localStorage.removeItem(clientConfig.redirectUrlParam);

    const user = JSON.parse((Cookies.get('user') ?? 'j:{}').slice(2));
    console.log(user);

    // Login succeeded. Go back to where you came from
    // router.replace(redirectUrl).then();
  }, [router]);

  return null;
}
