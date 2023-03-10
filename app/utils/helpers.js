export const formatearFecha = (fecha) => {
  const fecheNueva = new Date(fecha);
  const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
  return fecheNueva.toLocaleDateString('es-ES', opciones);
};
