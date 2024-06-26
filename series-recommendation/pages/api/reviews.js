import db from '../../models';

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
    const userId = req.session.id;

    try {
      const newReview = await db.Review.create({ serieId, userId, rating, comment });
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
