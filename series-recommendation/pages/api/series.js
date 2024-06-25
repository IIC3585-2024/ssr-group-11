import connectMongo from '../../lib/mongodb';
import Series from '../../models/Series';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await connectMongo();

  if (req.method === 'POST') {
    const { title, description } = req.body;

    const series = new Series({
        nombre,
        descripcion,
        temporadas,
        servicio,
        categoria,
        userId: session.user.id,
    });

    await series.save();

    return res.status(201).json(series);
  } else if (req.method === 'GET') {
        const series = await Series.find();
        return res.status(200).json(series);
  } else {
        return res.status(405).json({ message: 'Method not allowed' });
  }
};
