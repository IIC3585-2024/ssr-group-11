import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SerieDetails = ({ serie, session }) => {
    const router = useRouter();
    const [currentSerie, setCurrentSerie] = useState(serie);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
    
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (res.ok) {
            event.target.reset();
            router.reload();
        } else {
          console.error('Failed to add review');
        }
    };

    return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="serie-container bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{serie.nombre}</h1>
          <p className="text-gray-700 mb-4">{serie.descripcion}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Servicios:</span> {serie.servicio}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Temporadas:</span> {serie.temporadas}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Categorías:</span> {serie.categoria}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Estrellas:</span> {serie.estrellas} ({serie.calificaciones})</p>
        </div>
      </div>

      <div className="comments-section mt-8">
        <h2 className="text-2xl font-bold mb-4">Comentarios:</h2>
        {serie.reviews.map((comment, index) => (
          <div key={index} className="comment-card bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <div className="comment-header mb-2">
              <p className="text-yellow-500">{comment.rating} estrellas</p>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        ))}
        {session ? (
          <form className="comment-card bg-white p-4 rounded-lg shadow-md mt-4" onSubmit={handleSubmit}>
            <label className="block mb-2">
              <p className="font-semibold">Comentario:</p>
              <input type="text" name="comment" className="input-content w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              <p className="font-semibold">Estrellas:</p>
              <input type="number" min="1" max="10" name="rating" className="input-classification w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <input type="hidden" name="serieId" value={serie.id} />
            <button type="submit" className="button-comment bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Enviar</button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default SerieDetails;