import { getSession, useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import connectMongo from '../lib/mongodb.js';

export default function AddSeries({ session, series }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [temporadas, setTemporadas] = useState('');
  const [servicio, setServicio] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !descripcion) return;

    const res = await fetch('/api/series', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, descripcion, temporadas, servicio, categoria }),
    });

    const newSeries = await res.json();

    setNombre('');
    setDescripcion('');
    setTemporadas('');
    setServicio('');
    setCategoria('');
  };

  return (
    <div>
      {!session ? (
        <h1>Debe iniciar sesión para agregar una serie</h1>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
            />
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripcion"
            />
            <textarea
              value={temporadas}
              onChange={(e) => setTemporadas(e.target.value)}
              placeholder="Servicio Streaming"
            />
            <textarea
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              placeholder="Servicio Streaming"
            />
            <textarea
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="categoria"
            />
            <button type="submit">Add Series</button>
          </form>
          <ul>
            {series.map(s => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const db = await connectMongo();
    const seriesRes = db.collection('series');
    const series = seriesRes.rows;

    return {
        props: {
            session,
            series,
        },
    };
}