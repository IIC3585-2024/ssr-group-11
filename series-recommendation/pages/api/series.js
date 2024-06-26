import db from '../../models';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await db.sequelize.sync();
  if (req.method === 'GET') {
    try {
      const series = await db.Serie.findAll({ include: 'reviews' });
      res.status(200).json(series);
    } catch (error) {
      console.error('Error fetching series:', error);
      res.status(500).json({ error: 'Error fetching series' });
    }
  } else if (req.method === 'POST') {
    const { nombre, descripcion, temporadas, servicio, categoria } = req.body;
    const data = {
      'nombre': nombre,
      'descripcion': descripcion,
      'temporadas': temporadas,
      'servicio': servicio,
      'categoria': categoria,
      'estrellas': 0,
      'calificaciones': 0,
      'userId': '1'
    }
    // const session = await getSession({ req });

    // if (!session) {
    //   return res.status(401).json({ error: 'Debe iniciar sesión' });
    // }

    // const userId = session.user.id; // Asegúrate de que el ID de usuario esté en la sesión

    try {
      const newSerie = await db.Serie.create(data);
      return res.status(201).json(newSerie);
    } catch (error) {
      console.error('Error adding series:', error);
      return res.status(500).json({ error: 'Error al agregar la serie' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}