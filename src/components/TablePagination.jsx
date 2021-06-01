import React from 'react';

const TablePagination = ({ page, filteredItems, rowsPerPage, setPage, setRowsPerPage }) => {
  const changeRowsPerPageHandler = (evt) => {
    setRowsPerPage(Number(evt.target.value));
    setPage(0);
  };

  const handleFirstPageButtonClick = () => {
    setPage(0);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleLastPageButtonClick = () => {
    setPage(Math.ceil(filteredItems.length / rowsPerPage) - 1);
  };

  return (
    <div className="table-pagination__container">
      <div>
        <span>Строк на странице:</span>
        <select onChange={changeRowsPerPageHandler}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
        </select>
      </div>
      
      <div>
        <span>{page + 1} из {Math.ceil(filteredItems.length / rowsPerPage)}</span>

        <button 
          className="button table-pagination__button"
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}>
          &lt;&lt;
        </button>

        <button 
          className="button table-pagination__button"
          onClick={handleBackButtonClick}
          disabled={page === 0}>
          &lt;
        </button>

        <button 
          className="button table-pagination__button"
          onClick={handleNextButtonClick}
          disabled={page === (Math.ceil(filteredItems.length / rowsPerPage) - 1)}>
          &gt;
        </button>
        
        <button 
          className="button table-pagination__button"
          onClick={handleLastPageButtonClick}
          disabled={page === (Math.ceil(filteredItems.length / rowsPerPage) - 1)}>
          &gt;&gt;
        </button>
      </div>
    </div>
  )
}

export default TablePagination;
