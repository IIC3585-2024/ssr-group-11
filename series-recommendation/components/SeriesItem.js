import React from 'react';

const SeriesItem = ({ serie }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2">{serie.name}</h2>
      <p className="mb-1"><strong>Fecha emisión</strong> {serie.first_air_date}</p>
      <p className="mb-1"><strong>Descripción:</strong> {serie.overview}</p>
      <p className="mb-1">
        <strong>Estrellas:</strong> {serie.vote_average} ({serie.vote_count} calificaciones)
      </p>
    </div>
  );
};

export default SeriesItem;