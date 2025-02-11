export const metadata = {
    title: 'ホテル検索アプリ',
    description: 'ホテルを検索して詳細を確認できるアプリ',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="ja">
        <body>
          {children}
        </body>
      </html>
    );
  }
  