import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q2DRK1D4XE"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q2DRK1D4XE');
        `}} />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#111110" />
        <meta name="google-site-verification" content="qrhhnGiuiWrXrTByX288ZcW6Gf87-6bIA7mLfj87J50" />
        <meta property="og:site_name" content="RabbitHole" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
