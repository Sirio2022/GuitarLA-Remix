import { useLoaderData } from '@remix-run/react';
import { getGuitarras } from '~/models/guitarras.server';
import Guitarra from '~/components/guitarra';
import Styles from '~/styles/guitarras.css';

export function meta() {
  return {
    title: 'GuitarLA - Tienda',
    description: 'Guitarras de alta calidad',
  };
}

export function links() {
  return [{ rel: 'stylesheet', href: Styles }];
}

export async function loader() {
  const guitarras = await getGuitarras();

  return guitarras.data;
}

function Tienda() {
  const guitarras = useLoaderData();

  return (
    <main className="contenedor">
      <h2 className="heading">Nuestra Colección</h2>

      {guitarras?.length && (
        <div className="guitarras-grid">
          {guitarras.map((guitarra) => (
            <Guitarra key={guitarra?.id} guitarra={guitarra?.attributes} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Tienda;
