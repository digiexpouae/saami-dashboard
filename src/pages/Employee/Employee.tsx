import React, { useState } from 'react';
import RenderEmployeeForm from '../../common/RenderForm/RenderForm';
import TableComponent from '../../common/DataGrid/DataGrid';
import { useSelector } from 'react-redux';
import { fetchWarehouses } from '../../sliceApi/warehouseSlice'; 
const formSchema = [
  {
    name: 'employeeName',
    label: 'Username',
    type: 'text',
    required: true,
    placeholder: 'Enter your username',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    required: false,
    placeholder: 'Enter your age',
  },
  {
    name: 'assignedWarehouse',
    label: 'Assign Warehouse',
    type: 'select',
    required: true,
    placeholder: 'Select Warehouse',
    options: ['http://localhost:5000/api/warehouses/676dabe6bcac3c55b73c2b45'
  // warehouses drop down
    ],
  },
  
];

const payload = {
  warehouseName: '',
  location: '',
  totalEmployees: 0,
};
const Employee = () => {
  const [isForm, setIsForm] = useState(false);
  const [formPayload, setFormPayload] = useState({ ...payload });
const data=useSelector<any>((state)=>state.employee.data)
  const handleChange = (e:any) => {
    const data = { ...payload };
    const { name, value } = e.target;
    data[name] = value;
    setFormPayload(data);
  };
  const columns = [
    {
      header: 'Employee Name',
      accessorKey: 'username',
      cell: (info) => info.getValue(),
    },

    {
      header: 'Email',
      accessorKey: 'email',
      cell: (info) => info.getValue(),
    },

    {
      header: 'Password',
      accessorKey: 'password',
      cell: (info) => info.getValue(),
    },

   
    {
      header: 'Role',
      accessorKey: 'role',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Total Employees',
      accessorKey: 'totalEmployees',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Actions',
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="flex gap-2">
            <button
              className="text-blue-500"
              onClick={() => handleEdit(rowData)}
            >
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={() => handleDelete(rowData)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <button onClick={() => setIsForm(true)}className='mb-4 px-4 py-2 bg-blue-500 text-white'>Create </button>

      {isForm ? (
        <RenderEmployeeForm
          schema={formSchema}
          payload={formPayload}
          onCancel={() => setIsForm(false)}
          handleChange={handleChange}
        />
      ) : (
            <TableComponent columns={columns} data={data}/>
      )}
    </div>
  );
};

export default Employee;



/*
CREATE EMPLOYEE
GET ALL EMPLOYEE
UPDATE EMPLOYEE
DELETE EMPLOYEE
GET EMPLOYEE BY ID


SAME FOR WAREHOUSE

*/
