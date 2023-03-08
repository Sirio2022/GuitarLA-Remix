import { useLoaderData } from '@remix-run/react';
import { getGuitarra } from '~/models/guitarras.server';
import Styles from '~/styles/guitarras.css';

export function meta() {
  return {
    title: 'GuitarLA - Descripción',
    description: 'Guitarras de alta calidad',
  };
}

export function links() {
  return [{ rel: 'stylesheet', href: Styles }];
}

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  return guitarra;
}

function Guitarra() {
  const guitarra = useLoaderData();
  const { precio, imagen, descripcion, nombre } = guitarra.data[0].attributes;

  return (
    <main className="contenedor guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt="imagen de la guitarra"
      />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
      </div>
    </main>
  );
}

export default Guitarra;
