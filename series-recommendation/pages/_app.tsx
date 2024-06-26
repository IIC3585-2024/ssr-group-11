import './globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-800 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <Link href="/" legacyBehavior>
                <a className="text-white text-2xl font-bold hover:text-gray-300 transition">Inicio</a>
              </Link>
            </div>
            <AuthLinks />
          </div>
        </nav>
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}

function AuthLinks() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="text-white">Loading...</div>;
  }

  if (status === 'authenticated') {
    return (
      <div className="flex space-x-4">
        <Link href="/add_serie" legacyBehavior>
          <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Agregar Serie</a>
        </Link>
        <Link href="/api/auth/signout" legacyBehavior>
          <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Sign Out</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      <Link href="/api/auth/signin" legacyBehavior>
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Sign In</a>
      </Link>
    </div>
  );
}

export default MyApp;
