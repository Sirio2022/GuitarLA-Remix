import { useLoaderData } from '@remix-run/react';
import { getGuitarras } from '~/models/guitarras.server';
import ListadoGuitarras from '~/components/listado-guitarras';
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
      <ListadoGuitarras guitarras={guitarras} />
    </main>
  );
}

export default Tienda;
