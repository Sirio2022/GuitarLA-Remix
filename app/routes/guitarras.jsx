import { Outlet } from '@remix-run/react';

import Styles from '~/styles/guitarras.css';

export function links() {
  return [{ rel: 'stylesheet', href: Styles }];
}

function Tienda() {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  );
}

export default Tienda;
