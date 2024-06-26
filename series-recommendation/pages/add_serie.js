import { getSession, useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function AddSeries({ session }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [temporadas, setTemporadas] = useState('');
  const [servicio, setServicio] = useState('');
  const [categoria, setCategoria] = useState('');

  const CATEGORIES = ['Todos', 'Drama', 'Comedia', 'Romance', 'Ciencia Ficcion', 'Acción', 'Thriller', 'Documental', 'Fantasía', 'Animación', 'Infantil']
  const SERVICES = ['Todos', 'Netflix', 'Amazon Prime', 'HBO', 'Disney+', 'Apple TV+', 'Paramount+', 'HBO Max', 'Discovery+', 'Crunchyroll', 'Viki', 'Otro']


  const handleSubmit = async (e) => {
    e.preventDefault();

    // let userId = session.id
    const formData = {
      nombre,
      descripcion,
      temporadas,
      servicio,
      categoria,
    };

    try {
      const res = await fetch('/api/series', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        console.log('Serie agregada con éxito');
        setNombre('');
        setDescripcion('');
        setTemporadas('');
        setServicio('');
        setCategoria('');
      } else {
        console.error('Error al agregar la serie', res);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      {!session ? (
        <h1 className="text-center text-2xl font-bold">Debe iniciar sesión para agregar una serie</h1>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required 
            />
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required 
            />
            <textarea
              value={temporadas}
              onChange={(e) => setTemporadas(e.target.value)}
              placeholder="Temporadas"
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            <select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required 
            >
              <option value="">Selecciona un servicio</option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required 
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Agregar Serie</button>
          </form>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}