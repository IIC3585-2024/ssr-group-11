import { addSeries, getSeries } from '../../lib/services';
import db from '../../models';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  // await db.sequelize.sync();
  if (req.method === 'GET') {
    try {
      const series = await getSeries();
      res.status(200).json(series);
    } catch (error) {
      console.error('Error fetching series:', error);
      res.status(500).json({ error: 'Error fetching series' });
    }
  } else if (req.method === 'POST') {
    const { nombre, descripcion, temporadas, servicio, categoria } = req.body;
    // const session = await getSession({ req });

    // if (!session) {
    //   return res.status(401).json({ error: 'Debe iniciar sesión' });
    // }

    // const userId = session.user.id; // Asegúrate de que el ID de usuario esté en la sesión

    try {
      const newSeries = await addSeries(nombre, descripcion, temporadas, servicio, categoria, 0, 0, '1');
      return res.status(201).json(newSeries);
    } catch (error) {
      console.error('Error adding series:', error);
      return res.status(500).json({ error: 'Error al agregar la serie' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}