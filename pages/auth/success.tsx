import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { clientConfig } from '@config/client-config';

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const redirectUrl = localStorage.getItem(clientConfig.redirectUrlParam) ?? clientConfig.defaultRedirectUrl;
    localStorage.removeItem(clientConfig.redirectUrlParam);

    // Login succeeded. Go back to where you came from
    router.replace(redirectUrl).then();
  }, [router]);

  return null;
}
