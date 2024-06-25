import connectMongo from '../../lib/mongodb';
import Review from '../../models/Review';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await connectMongo();

  if (req.method === 'POST') {
    const { seriesId, rating, comment } = req.body;

    const review = new Review({
      seriesId,
      userId: session.user.id,
      rating,
      comment,
    });

    await review.save();

    return res.status(201).json(review);
  } else if (req.method === 'GET') {
        const { seriesId } = req.query;
        const reviews = await Review.find({ seriesId: seriesId });
        return res.status(200).json(reviews);
  } else {
        return res.status(405).json({ message: 'Method not allowed' });
  }
};
