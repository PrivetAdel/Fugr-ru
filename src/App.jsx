import { useState, useEffect } from 'react';
import { getApiResource } from './utils';
import { SMALL_DATA_URL } from './constants';
import { useSortableData } from './hooks/useSortableData';
import { DataButton, Search, Form, FormToggle, Table, TablePagination, SelectedItem } from './components';

const getFilteredData = (items, search) => {
  if (!search) {
    return items;
  }

  return items.filter(item => {
    return (
      item['id'].toString().includes(search) ||
      item['firstName'].toLowerCase().includes(search.toLowerCase()) ||
      item['lastName'].toLowerCase().includes(search.toLowerCase()) ||
      item['email'].toLowerCase().includes(search.toLowerCase()) ||
      item['phone'].toLowerCase().includes(search.toLowerCase())
    )
  });
};

const App = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [newPerson, setNewPerson] = useState(null);
  const [url, setUrl] = useState(SMALL_DATA_URL);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(false);
  const { items, requestSort, sortConfig } = useSortableData(data);
  const filteredItems = getFilteredData(items, search);

  const getResource = async (url) => {
    const res = await getApiResource(url);
    if (res) {
      setError(false);
      setData(res);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    getResource(url);
    if (data.length > 0 || error) {
      setIsFetching(false);
    }
  }, [url, error]);

  useEffect(() => {
    if (data.length > 0) {
      setIsFetching(false);
    }
  }, [data]);

  useEffect(() => {
    if (newPerson) {
      data.unshift(newPerson);
      setNewPerson(null);
    }
  }, [newPerson]);

  return (
    <div className="app-container">
        <div className="app-header">
          <DataButton 
            url={url} 
            isFetching={isFetching}
            setError={setError}
            setData={setData} 
            setRowsPerPage={setRowsPerPage} 
            setPage={setPage} 
            setSearch={setSearch} 
            requestSort={requestSort}
            setSelectedItem={setSelectedItem}
            setUrl={setUrl} />

          <Search
            url={url}  
            setSearch={setSearch} 
            isFetching={isFetching}
            error={error}
            setPage={setPage} />
        </div>

        <FormToggle 
          isOpenForm={isOpenForm} 
          setIsOpenForm={setIsOpenForm}
          error={error}
          isFetching={isFetching} />

        {
          isOpenForm && <Form setNewPerson={setNewPerson} />
        }
        
        {
          isFetching ? <p>Loading...</p> :
          error ? <p>Network Error</p> : (
            filteredItems.length > 0 ? (
              <>
                <Table 
                  rowsPerPage={rowsPerPage} 
                  filteredItems={filteredItems} 
                  page={page} 
                  requestSort={requestSort}
                  setSelectedItem={setSelectedItem}
                  sortConfig={sortConfig} />

                <TablePagination 
                  rowsPerPage={rowsPerPage} 
                  filteredItems={filteredItems} 
                  page={page} 
                  setPage={setPage} 
                  setRowsPerPage={setRowsPerPage} />

                {
                  selectedItem && <SelectedItem selectedItem={selectedItem} />
                }
              </>
            ) : <p>Нет совпадений</p>
          )
        }
    </div>
  );
};

export default App;
