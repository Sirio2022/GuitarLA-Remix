import { useLoaderData } from '@remix-run/react';
import ListadoGuitarras from '~/components/listado-guitarras';
import ListadoPosts from '~/components/listado-posts';
import { getGuitarras } from '~/models/guitarras.server';
import { getPosts } from '~/models/posts.server';

import { getCurso } from '~/models/curso.server';

import StylesGuitarras from '~/styles/guitarras.css';
import StylesPosts from '~/styles/blog.css';
import StylesCurso from '~/styles/curso.css';
import Curso from '~/components/curso';

export function meta() {}

export function links() {
  return [
    { rel: 'stylesheet', href: StylesGuitarras },
    { rel: 'stylesheet', href: StylesPosts },
    { rel: 'stylesheet', href: StylesCurso },
  ];
}

export async function loader() {
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso(),
  ]);

  return {
    guitarras: guitarras?.data,
    posts: posts?.data,
    curso: curso?.data,
  };
}

function Index() {
  const { guitarras, posts, curso } = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras guitarras={guitarras} />
      </main>

      <Curso curso={curso?.attributes} />

      <section className="contenedor">
        <ListadoPosts posts={posts} />
      </section>
    </>
  );
}

export default Index;
