const SearchResults = ({ results }) => {
    return (
      <div>
        <h2>Resultados de búsqueda</h2>
        <div>
          {results && results.length > 0 ? (
            results.map((serie) => (
              <SeriesItem key={serie.id} serie={serie} />
            ))
          ) : (
            <p>No hay series disponibles</p>
          )}
        </div>
      </div>
    );
  };
  
export default SearchResults;
  