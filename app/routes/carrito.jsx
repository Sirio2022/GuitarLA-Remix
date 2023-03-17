import { useState, useEffect } from 'react';
import { useOutletContext } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import styles from '~/styles/carrito.css';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
}

export function meta() {
  return {
    title: 'GuitarLA - Carrito de compras',
    description:
      'Carrito de compras de la tienda de guitarras, cursos y accesorios',
  };
}

function Carrito() {
  const [total, setTotal] = useState(0);

  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

  useEffect(() => {
    const calcularTotal = carrito.reduce((acc, guitarra) => {
      return acc + guitarra.precio * guitarra.cantidad;
    }, 0);
    setTotal(calcularTotal);
  }, [carrito]);

  return (
    <ClientOnly fallback={'cargando...'}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de compras</h1>

          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length === 0
                ? 'Carrito vacío'
                : carrito?.map((guitarra) => (
                    <div key={guitarra.id} className="producto">
                      <div>
                        <img
                          src={guitarra.imagen}
                          alt={`imagen de guitarra ${guitarra.nombre}`}
                        />
                      </div>
                      <div>
                        <p className="nombre">{guitarra.nombre}</p>
                        <p className="cantidad">Cantidad:</p>

                        <select
                          value={guitarra.cantidad}
                          className="select"
                          onChange={(e) =>
                            actualizarCantidad({
                              cantidad: +e.target.value,
                              id: guitarra.id,
                            })
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>

                        <p className="precio">
                          Precio: <span>${guitarra.precio}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal:{' '}
                          <span>${guitarra.precio * guitarra.cantidad}</span>
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn_eliminar"
                        onClick={() => eliminarGuitarra(guitarra.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
}

export default Carrito;
