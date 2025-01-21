import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import useDataGrid from './useDataGrid';

const TableComponent = ({ columns, data, isEmployeeData }) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleRowClick = (employeeId, employeeName) => {
    // Navigate to the employee details page with the employeeId and employeeName as query params
    navigate(`/employee/${employeeId}?name=${employeeName}`); // use navigate instead of history.push
  };

  const { renderColumns, renderBody } = useDataGrid(columns, data, isEmployeeData, handleRowClick);

  return (
    <table className="w-full table-auto">
      {renderColumns()} 
      {renderBody()} 
    </table>
  );
};

export default TableComponent;
