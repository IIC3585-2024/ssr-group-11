import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
