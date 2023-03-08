import { useLoaderData } from '@remix-run/react';
import { getGuitarra } from '~/models/guitarras.server';
import Styles from '~/styles/guitarras.css';

export function meta({ data }) {
  return {
    title: `GuitarLA - ${data.data[0].attributes.nombre}`,
    description: `Guitarras de alta calidad, tienda, guitarra ${data.data[0].attributes.nombre}`,
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
