import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Ensure mobile devices use the device width for proper scaling */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* Primary favicon (cache-busted) */}
          <link rel="icon" href="/favicon.ico?v=1" />
          {/* Helpful additional links */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
