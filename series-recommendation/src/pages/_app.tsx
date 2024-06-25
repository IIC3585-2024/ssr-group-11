import '../globals.css';
import React from 'react';
import Link from 'next/link';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" legacyBehavior>
              <a className="text-white text-2xl font-bold">Inicio</a>
            </Link>
          </div>
          <div>
            <Link href="/search" legacyBehavior>
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Buscador</a>
            </Link>
            <Link href="/add_serie" legacyBehavior>
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Agregar Serie</a>
            </Link>
          </div>
          <div>
            <Link href="/my_perfil" legacyBehavior>
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Mi Perfil</a>
            </Link>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />
    </div>);
}

export default MyApp;
