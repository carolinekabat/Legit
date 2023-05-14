import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MetaMaskProvider } from '../hooks/useMetaMask';
import { SDKLayout } from '../components/SDKProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
      <SDKLayout>
        <Component {...pageProps} />
      </SDKLayout>
    </MetaMaskProvider>
  );
}
