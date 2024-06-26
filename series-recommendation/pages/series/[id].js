import { useRouter } from 'next/router';
import { getSession, useSession, signIn, signOut } from 'next-auth/react';
import SerieDetails from '../../components/SerieDetails';

export default function SeriesPage({session, series}) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null; // Handle case when id is not available yet
  console.log(series)

  const serie = series.find(s => s.id === Number(id));

  if (!serie) return <p>No se encontró la serie con el ID especificado</p>;

  return (
    <div>
       <SerieDetails serie={serie} session={session}/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let series = []
 
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