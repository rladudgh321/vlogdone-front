import React from 'react';
import Header from './common/Header';
import './globals.css';
import Footer from './common/Footer';
import Providers from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <React.Suspense fallback={<div>Loading ...</div>}>
            <Header />
            <hr />
            {children}
            <Footer />
          </React.Suspense>
        </body>
      </html>
    </Providers>
  );
}
