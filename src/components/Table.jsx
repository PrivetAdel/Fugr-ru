import React, { useState } from 'react';
import classnames from 'classnames';

const Table = ({ rowsPerPage, filteredItems, page, requestSort, setSelectedItem, sortConfig }) => {
  const [active, setActive] = useState(null);
  const headers = ['id', 'firstName', 'lastName', 'email', 'phone'];

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredItems.length - page * rowsPerPage);

  const getClassNamesFor = (header) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === header ? sortConfig.direction : undefined;
  };

  const selectItemHandler = (item) => {
    setActive(item);
    setSelectedItem.bind(null, item)();
  }

  return (
    <table className="table">
      <thead>
        <tr>
          { headers.map((header) => (
              <th key={header}>
                <button 
                  type="button"
                  className={classnames("table-header", getClassNamesFor(header))}
                  onClick={() => requestSort(header)}>
                  {header}
                </button>
              </th>
            ))}
        </tr>
      </thead>

      <tbody>
        {(rowsPerPage > 0 ? 
          filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : filteredItems).map((item) => (
            <tr 
              className={classnames("table-row", active === item ? "active" : "")}
              key={`${item.id}_${item.phone}`} 
              onClick={() => selectItemHandler(item)}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        
        {emptyRows > 0 && (
            <tr style={{ height: 42 * emptyRows }}>
              <td colSpan={5} />
            </tr>
          )}
      </tbody>
    </table>
  );
};

export default Table;
