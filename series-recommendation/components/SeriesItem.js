import React from 'react';

const SeriesItem = ({ serie }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2">{serie.nombre}</h2>
      <p className="mb-1"><strong>Temporadas</strong> {serie.temporadas}</p>
      <p className="mb-1"><strong>Plataforma</strong> {serie.servicio}</p>
      <p className="mb-1"><strong>Descripción:</strong> {serie.descripcion}</p>
      <p className="mb-1">
        <strong>Estrellas:</strong> {serie.estrellas} ({serie.calificaciones} calificaciones)
      </p>
    </div>
  );
};

export default SeriesItem;