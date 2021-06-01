import React, { useState, useEffect } from 'react';

const Search = ({ url, setSearch, isFetching, error, setPage }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('')
  }, [url]);

  const handleInputValue = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSearch(value);
    setPage(0);
  };

  return (
    <form className="search__form">
      <input
        type="text"
        placeholder="Type here smth..."
        className="input search__input"
        onChange={handleInputValue}
        value={value} />
      <button 
        type="submit"
        className="button search__button"
        onClick={handleSubmit}
        disabled={isFetching || error}>
        Search
      </button>
    </form>
  );
};

export default Search;
