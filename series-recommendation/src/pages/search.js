import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const Search = ({ initialResults }) => {
  const [searchResults, setSearchResults] = useState(initialResults);

  const handleSearch = async (query) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`
        }
    };
    const res = await fetch(`https://api.themoviedb.org/3/discover/tv?${query}`, options)
    if (!res.ok) {
      throw new Error('Network response was not ok' + res.statusText);
    }
    const data = await res.json();
    setSearchResults(data.results);
  };

  return (
    <div>
      <h1>Búsqueda de Series</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default Search;
