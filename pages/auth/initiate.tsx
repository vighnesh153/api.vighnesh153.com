import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { clientConfig } from '@config/client-config';

export default function AuthInitiate() {
  const router = useRouter();

  useEffect(() => {
    // Will be used when auth succeeds
    const redirectUrl = `${router.query.redirectUrl ?? clientConfig.defaultRedirectUrl}`;
    localStorage.setItem(clientConfig.redirectUrlParam, redirectUrl);

    // Initiate login via google
    router.replace(clientConfig.loginViaGoogle).then();
  }, [router]);

  return null;
}
