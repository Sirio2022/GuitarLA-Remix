import { useEffect, useState } from 'react';
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useCatch,
  Link,
} from '@remix-run/react';
import styles from '~/styles/index.css';
import Header from '~/components/header';
import Footer from '~/components/footer';

export const meta = () => ({
  charset: 'utf-8',
  title: 'GuitarLA - Remix',
  viewport: 'width=device-width,initial-scale=1',
  description: 'GuitarLA - Remix',
});

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
    },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap',
    },
    { rel: 'stylesheet', href: styles },
  ];
}

export default function App() {
  const carritoLS =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('carrito')) ?? []
      : null;
  const [carrito, setCarrito] = useState(carritoLS);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(guitarra) {
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Actualizar cantidad
      const nuevoCarrito = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          // Actualizar cantidad, (+=) suma la cantidad actual con la nueva
          guitarraState.cantidad = guitarra.cantidad;
        }
        return guitarraState;
      });
      // Setear el nuevo carrito
      setCarrito(nuevoCarrito);
    } else {
      // Nuevo producto
      setCarrito([...carrito, guitarra]);
    }
  }

  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
  };

  const eliminarGuitarra = (id) => {
    const carritoActualizado = carrito.filter((guitarra) => guitarra.id !== id);
    setCarrito(carritoActualizado);
  };

  return (
    <Document>
      <Outlet
        context={{
          agregarAlCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra,
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/** Manejo de errores */

export function CatchBoundary() {
  const error = useCatch();

  return (
    <Document>
      <p className="error">
        {error.status} {error.statusText}
      </p>
      <Link className="error-enlace" to="/">
        {' '}
        ← Volver a la página principal
      </Link>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <p className="error">
        {error.status} {error.statusText}
      </p>
      <Link className="error-enlace" to="/">
        Volver a la página principal
      </Link>
    </Document>
  );
}
