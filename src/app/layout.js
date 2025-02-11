export const metadata = {
    title: 'My App',
    description: 'My Next.js App with proper Root Layout',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="ja">
        <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="My Next.js App" />
        <link rel="icon" href="/favicon.ico" />
        <title>ホテル検索アプリ</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }
  