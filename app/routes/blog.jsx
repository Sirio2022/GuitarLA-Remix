import { useLoaderData } from '@remix-run/react';
import ListadoPost from '~/components/listado-posts';
import { getPosts } from '~/models/posts.server';
import Styles from '~/styles/blog.css';

export function meta() {
  return {
    title: 'GuitarLA - Nuestro Blog',
    description:
      'GuitarLA - Nuestro Blog, donde encontrarás información sobre guitarras, amplificadores, pedales, etc.',
  };
}

export function links() {
  return [{ rel: 'stylesheet', href: Styles }];
}

export async function loader() {
  const posts = await getPosts();

  return posts.data;
}

function Blog() {
  const posts = useLoaderData();

  return (
    <main className="contnedor">
      <ListadoPost posts={posts} />
    </main>
  );
}

export default Blog;
