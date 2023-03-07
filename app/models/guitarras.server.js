export async function getGuitarras() {
  try {
    const respuesta = await fetch(
      `${process.env.API_URL}/guitarras?populate=imagen`
    );
    return await respuesta.json();
  } catch (error) {
    return { data: [] };
  }
}
