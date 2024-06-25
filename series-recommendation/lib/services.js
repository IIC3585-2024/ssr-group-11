import { Series, Review } from '../models';

export const getSeries = async () => {
  return await Series.findAll({ include: 'reviews' });
};

export const addSeries = async (nombre, descripcion, temporadas, servicio, categoria, estrellas=0, calificaciones=0, userId) => {
  return await Series.create({ nombre, descripcion, temporadas, servicio, categoria, estrellas, calificaciones, userId});
};

export const getReviews = async (seriesId) => {
  return await Review.findAll({ where: { seriesId } });
};

export const addReview = async (seriesId, userId, rating, comment) => {
  return await Review.create({ seriesId, userId, rating, comment });
};
