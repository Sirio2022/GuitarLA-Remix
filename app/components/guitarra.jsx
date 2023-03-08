import { Link } from '@remix-run/react';

export default function Guitarra({ guitarra }) {
  const { precio, imagen, descripcion, url, nombre } = guitarra;

  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.formats.medium.url} alt={nombre} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">${precio}</p>

        <Link to={`/guitarras/${url}`} className="enlace">
          Ver más
        </Link>
      </div>
    </div>
  );
}
