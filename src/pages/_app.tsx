import type { AppProps } from 'next/app';
import '@/index.css'; // adjust the path if index.css is in src; this should work with baseUrl set in tsconfig

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
