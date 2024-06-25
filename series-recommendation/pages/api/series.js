import { addSeries, getSeries } from '../../lib/services';
import db from '../../models';

export default async function handler(req, res) {
  await db.sequelize.sync();
  if (req.method === 'GET') {
    try {
      const series = await getSeries();
      res.status(200).json(series);
    } catch (error) {
      console.error('Error fetching series:', error);
      res.status(500).json({ error: 'Error fetching series' });
    }
  } else if (req.method === 'POST') {
    const { nombre, descripcion, temporadas, servicio, categoria, userId } = req.body;

    try {
      const newSeries = await addSeries(nombre, descripcion, temporadas, servicio, categoria, '0', '0', userId);
      res.status(201).json(newSeries);
    } catch (error) {
      console.error('Error adding series:', error);
      res.status(500).json({ error: 'Error adding series' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}