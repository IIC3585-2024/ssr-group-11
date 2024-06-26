import { Series, Review } from '../models';

export const getSeries = async () => {
  return await Series.findAll({ include: 'reviews' });
};

export const addSeries = async (nombre, descripcion, temporadas, servicio, categoria, estrellas, calificaciones, userId) => {
  try {
    const newSeries = await Series.create({ nombre, descripcion, temporadas, servicio, categoria, estrellas, calificaciones, userId });
    return newSeries;
  } catch (error) {
    console.error('Error adding series:', error);
    throw error; // Throw the error to handle it elsewhere if needed
  }
};

export const getReviews = async (seriesId) => {
  return await Review.findAll({ where: { seriesId } });
};

export const addReview = async (seriesId, userId, rating, comment) => {
  return await Review.create({ seriesId, userId, rating, comment });
};
