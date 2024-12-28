import React from 'react';
import useDataGrid from './useDataGrid';

const TableComponent = ({ columns, data }) => {
  const { renderColumns, renderBody } = useDataGrid(columns, data);

  return (
    <table className="w-full table-auto">
      {renderColumns()}
      {renderBody()}
    </table>
  );
};

export default TableComponent;
