import { useState } from 'react';

import { useLoaderData, useOutletContext } from '@remix-run/react';
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
  const { agregarAlCarrito } = useOutletContext();

  const [cantidad, setCantidad] = useState(0);

  const guitarra = useLoaderData();
  const { precio, imagen, descripcion, nombre } = guitarra.data[0].attributes;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cantidad === 0) {
      alert('Debe seleccionar una cantidad');
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    };
    agregarAlCarrito(guitarraSeleccionada);
  };

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

        <form className="formulario" onSubmit={handleSubmit}>
          <label htmlFor="cantidad">Cantidad:</label>
          <select id="cantidad" onChange={(e) => setCantidad(+e.target.value)}>
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </div>
  );
}

// +event.target.value convierte el string a number, también se puede usar Number(event.target.value) o parseInt(event.target.value)

export default Guitarra;
