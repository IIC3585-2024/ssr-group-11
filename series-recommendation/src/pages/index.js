import SeriesItem from '../components/SeriesItem';

const Home = ({ series }) => {
    return (
      <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">¡Bienvenido al recomendador de series!</h1>
        <h2 className="text-4xl font-bold mb-6 text-center">Series Populares Hoy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {series && series.length > 0 ? (
            series.map((serie) => (
              <SeriesItem key={serie.id} serie={serie} />
            ))
          ) : (
            <p>No hay series disponibles</p>
          )}
        </div>
      </div>
    </div>
      );
}

export async function getServerSideProps() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`
        }
    };

    const res = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
    if (!res.ok) {
      throw new Error('Network response was not ok' + res.statusText);
    }
    const data = await res.json();
    const series = data.results

    return { props: { series } }
}

export default Home;