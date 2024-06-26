import { getSession, useSession, signIn, signOut } from 'next-auth/react';
import SeriesItem from '../components/SeriesItem';
import { useState } from 'react';

const Home = ({ session, series }) => {
  const { data: sessionData, status } = useSession({ initialSession: session });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [filterStar, setFilterStar] = useState('Todos');
  const [filterServices, setFilterServices] = useState('Todos');

  const categoryOptions = ['Todos', 'Drama', 'Comedia', 'Romance', 'Ciencia Ficcion', 'Acción', 'Thriller', 'Documental', 'Fantasía', 'Animación', 'Infantil']
  const starsOptions = ['Todos', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const serviceOptions = ['Todos', 'Netflix', 'Amazon Prime', 'HBO', 'Disney+', 'Apple TV+', 'Paramount+', 'HBO Max', 'Discovery+', 'Crunchyroll', 'Viki', 'Otro']

  // const series = [
  // {
  //   id: 1,
  //   nombre: 'Breaking Bad',
  //   image: 'breaking_bad.jpg',
  //   servicio: 'Netflix',
  //   temporadas: '15,15,15,15',
  //   descripcion: 'The story of Walter White, a low-ranking stockbroker who tries to take advantage of the consequences of his actions.',
  //   categoria: 'Drama',
  //   estrellas: 10,
  //   calificaciones: 3
  // },
  // {
  //   id: 2,
  //   nombre: 'Game of Thrones',
  //   image: 'got.jpg',
  //   servicio: 'HBO',
  //   temporadas: '8,8,8,8,8',
  //   descripcion: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
  //   categoria: 'Fantasy',
  //   estrellas: 8,
  //   calificaciones: 3
  // }]

  if (status === 'loading') return <h1> loading... please wait</h1>;

  const filteredSeries = series.filter(serie =>
    serie.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'Todos' || serie.categoria.toLowerCase() === filterCategory.toLowerCase()) &&
    (filterStar === 'Todos' || serie.estrellas === parseInt(filterStar)) &&
    (filterServices === 'Todos' || serie.servicio.toLowerCase() === filterServices.toLowerCase())
  );
  
  if (status === 'authenticated' && sessionData) {
    return (
      <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">¡Bienvenido al recomendador de series!</h1>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-4 justify-center">
          {/* Categoría */}
          <div className="flex items-center">
            <label className="mr-2">Categoría:</label>
            <select
              className="p-2"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categoryOptions.map((categoria, index) => (
                <option key={index} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          {/* Estrellas */}
          <div className="flex items-center">
            <label className="mr-2">Estrellas:</label>
            <select
              className="p-2"
              value={filterStar}
              onChange={(e) => setFilterStar(e.target.value)}
            >
              {starsOptions.map((star, index) => (
                <option key={index} value={star}>{star}</option>
              ))}
            </select>
          </div>

          {/* Servicios */}
          <div className="flex items-center">
            <label className="mr-2">Servicio:</label>
            <select
              className="p-2"
              value={filterServices}
              onChange={(e) => setFilterServices(e.target.value)}
            >
              {serviceOptions.map((servicio, index) => (
                <option key={index} value={servicio}>{servicio}</option>
              ))}
            </select>
          </div>
        {/* Búsqueda */}
        <input
            type="text"
            placeholder="Buscar serie"
            className="p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista de Series */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
          {filteredSeries.length > 0 ? (
            filteredSeries.map((serie) => (
              <SeriesItem key={serie.id} serie={serie} />
            ))
          ) : (
            <p className="text-center">No hay series disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
} else return (
  <div className="bg-gray-100 min-h-screen">   
    <div className="container mx-auto py-8">
    <h1 className="text-4xl font-bold mb-6 text-center">¡Debes Iniciar Sesión para interactuar con la App!</h1>
  </div>
  </div>
);}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let series = [];

  try {
    const res = await fetch('http://localhost:3000/api/series', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      console.log('Series obtenidas con éxito');
      series = await res.json();  // Extrae los datos de la respuesta usando res.json()
    } else {
      console.error('Error en get series:', res.status);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }

  return {
    props: { session, series },
  };
}

export default Home;