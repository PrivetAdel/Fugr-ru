import React from 'react';
import { SMALL_DATA_URL, LARGE_DATA_URL } from '../constants';

const DataButton = ({ url, isFetching, setError, setData, setRowsPerPage, setPage, setSearch, requestSort, setSelectedItem, setUrl }) => {
  const changeDataHandler = () => {
    setData([]);
    setError(false);
    setRowsPerPage(10);
    setPage(0);
    setSearch('');
    requestSort('');
    setSelectedItem(null);

    if (url === SMALL_DATA_URL) {
      setUrl(LARGE_DATA_URL);
    } else {
      setUrl(SMALL_DATA_URL);
    }
  };

  return (
    <button onClick={changeDataHandler} disabled={isFetching} className="button">
      {
        url === SMALL_DATA_URL ? 'показать большой объем данных' : 'показать маленький объем данных'
      }
    </button>
  );
};

export default DataButton;
