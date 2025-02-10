import { AppProvider } from "../context/App.context";

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
