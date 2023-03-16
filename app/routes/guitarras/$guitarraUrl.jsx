import { useLoaderData } from '@remix-run/react';
import { getGuitarra } from '~/models/guitarras.server';

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  if (guitarra.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada',
    });
  }

  return guitarra;
}

export function meta({ data }) {
  if (!data) {
    return {
      title: 'GuitarLA - Guitarra no encontrada',
      description: 'Guitarras de alta calidad, tienda, guitarra no encontrada',
    };
  }

  return {
    title: `GuitarLA - ${data.data[0].attributes.nombre}`,
    description: `Guitarras de alta calidad, tienda, guitarra ${data.data[0].attributes.nombre}`,
  };
}

function Guitarra() {
  const guitarra = useLoaderData();
  const { precio, imagen, descripcion, nombre } = guitarra.data[0].attributes;

  return (
    <div className="guitarra">
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
    </div>
  );
}

export default Guitarra;
