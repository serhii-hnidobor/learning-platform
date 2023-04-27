import { AppRoutes } from 'common/enum/enum';
import { concatClasses } from 'helpers/string/string';
import { ToastContainer } from 'react-toastify';
import { AppProps } from 'next/app';
import { SkeletonWrapper } from 'components/common/skeleton-wrapper/skeleton-wrapper';
import dynamic from 'next/dynamic';

import { Lato } from 'next/font/google';

import SimpleBar from 'simplebar-react';

import Head from 'next/head';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Nprogress from 'nprogress';

import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '../global-style.css';
import 'nprogress/nprogress.css';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

const Header = dynamic(import('components/common/header/header'));
const Footer = dynamic(import('components/common/footer/footer'));

Nprogress.configure({ easing: 'ease', speed: 500, showSpinner: false });

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const Router = useRouter();

  const { route: pathname } = Router;

  useDeepCompareEffect(() => {
    Router.events.on('routeChangeStart', () => {
      Nprogress.start();
    });

    Router.events.on('routeChangeComplete', () => {
      Nprogress.done(false);
    });
  }, [Router]);

  const isAuthRoute =
    pathname === AppRoutes.SIGN_UP || pathname === AppRoutes.SIGN_IN;

  const is404Or500Route =
    pageProps.statusCode === 404 || pageProps.statusCode === 500;

  const fontClassName = `${lato.variable} font-serif`;

  return (
    <SessionProvider session={session}>
      <div className={fontClassName}>
        <SkeletonWrapper>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Head>
            <meta name="application-name" content="PWA App" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="default"
            />
            <meta name="apple-mobile-web-app-title" content="PWA App" />
            <meta name="description" content="Best PWA App in the world" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta
              name="msapplication-config"
              content="/icons/browserconfig.xml"
            />
            <meta name="msapplication-TileColor" content="#2B5797" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="theme-color" content="#000000" />

            <title>Learning platform</title>

            <link rel="manifest" href="/manifest.json" />

            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link
              rel="apple-touch-icon"
              sizes="57x57"
              href="/apple-touch-icon-57x57.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/apple-touch-icon-72x72.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="76x76"
              href="/apple-touch-icon-76x76.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/apple-touch-icon-114x114.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="120x120"
              href="/apple-touch-icon-120x120.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="144x144"
              href="/apple-touch-icon-144x144.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/apple-touch-icon-152x152.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon-180x180.png"
            />

            <link rel="shortcut icon" href="/favicon.ico" />

            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:url"
              content="https://learning-platform-pied.vercel.app/"
            />
            <meta name="twitter:title" content="Learning platform" />
            <meta
              name="twitter:description"
              content="Learning platform - learn anything"
            />
            <meta
              name="twitter:image"
              content="https://learning-platform-pied.vercel.app/logo-192x192.png"
            />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Learning platform" />
            <meta
              property="og:description"
              content="Learning platform - learn anything"
            />
            <meta property="og:site_name" content="Learning platform" />
            <meta
              property="og:url"
              content="https://learning-platform-pied.vercel.app/"
            />
            <meta
              property="og:image"
              content="https://learning-platform-pied.vercel.app/apple-touch-icon.png"
            />
          </Head>
          {(isAuthRoute || is404Or500Route) && (
            <div
              className={concatClasses([
                'min-h-[100vh]',
                'min-w-[100vw]',
                'overflow-y-auto',
                'overflow-x-hidden',
              ])}
            >
              <Component {...pageProps} />
            </div>
          )}
          {!isAuthRoute && !is404Or500Route && (
            <>
              <Header />
              <SimpleBar
                style={{ maxHeight: 'calc(100vh - 80px)' }}
                className={concatClasses([
                  'h-[calc(100vh_-_80px)]',
                  'flex',
                  'flex-col',
                  'justify-between',
                  'overflow-x-hidden',
                  'overflow-y-auto',
                  'relative',
                ])}
                autoHide={false}
              >
                <div className={'flex h-full flex-col justify-between'}>
                  <Component {...pageProps} />
                  <Footer />
                </div>
              </SimpleBar>
            </>
          )}
        </SkeletonWrapper>
      </div>
    </SessionProvider>
  );
}

export default App;
