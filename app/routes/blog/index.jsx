import { useLoaderData } from '@remix-run/react';
import ListadoPost from '~/components/listado-posts';
import { getPosts } from '~/models/posts.server';

export function meta() {
  return {
    title: 'GuitarLA - Nuestro Blog',
    description:
      'GuitarLA - Nuestro Blog, donde encontrarás información sobre guitarras, amplificadores, pedales, etc.',
  };
}

export async function loader() {
  const posts = await getPosts();

  return posts.data;
}

function Blog() {
  const posts = useLoaderData();

  return <ListadoPost posts={posts} />;
}

export default Blog;
