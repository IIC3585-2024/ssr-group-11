import db from '../../models';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await db.sequelize.sync();
  if (req.method === 'GET') {
    const { serieId } = req.query;

    try {
      const reviews = await db.Review.findAll({ where: { serieId } });
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Error fetching reviews' });
    }
  } else if (req.method === 'POST') {
    const { serieId, rating, comment } = req.body;

    try {
      const newReview = await db.Review.create({ serieId, userId: '0', rating, comment });
      // Obtener todos los comentarios de la serie
      const reviews = await db.Review.findAll({ where: { serieId } });

      // Calcular las nuevas estrellas y calificaciones
      const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
      const newCalificaciones = reviews.length;
      const newEstrellas =  parseInt(totalRatings / newCalificaciones);

      // Actualizar la serie
      await db.Serie.update(
        { estrellas: newEstrellas, calificaciones: newCalificaciones },
        { where: { id: serieId } }
      );

      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Error adding review' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
