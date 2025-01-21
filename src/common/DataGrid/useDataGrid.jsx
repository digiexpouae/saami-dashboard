import React, { useMemo } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';

const useDataGrid = (columns, data, isEmployeeData, handleRowClick) => {
  const table = useReactTable({
    columns: useMemo(() => columns, [columns]),
    data: useMemo(() => data, [data]),
    getCoreRowModel: getCoreRowModel(),
  });

  const renderColumns = () => {
    return (
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="bg-gray-2 text-left dark:bg-meta-4"
          >
            {headerGroup.headers.map((head) => (
              <th
                key={head.id}
                colSpan={head.colSpan}
                className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
              >
                {flexRender(head.column.columnDef.header, head.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
    );
  };

  const renderBody = () => {
    return (
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => {
              if (isEmployeeData) {
                console.log(row.original);
                
                const employeeName = row.original.username;
                const employeeId = row.original._id; 
                handleRowClick(employeeId, employeeName);
              }
            }}
            className="cursor-pointer hover:bg-gray-100"
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="py-4 px-4 text-gray-800 dark:text-gray-200"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return {
    renderBody,
    renderColumns,
  };
};

export default useDataGrid;
