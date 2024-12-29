import React, { useState } from 'react';
import RenderWarehouseForm from '../../common/RenderForm/RenderForm';
import WarehouseTable from './WarehouseTable';
import TableComponent from '../../common/DataGrid/DataGrid'
const formSchema = [
  {
    name: 'age',
    label: 'Warehouse Age',
    type: 'text',
    required: true,
    placeholder: 'Warehouse Age',
  },
  {
    name: 'warehouseName',
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
    name: 'gender',
    label: 'Gender',
    type: 'select',
    required: true,
    placeholder: 'Select your gender',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    name: 'profilePicture',
    label: 'Profile Picture',
    type: 'file',
    required: false,
    accept: 'image/*',
  },
  {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    required: false,
    placeholder: 'Tell us about yourself',
  },
];



const payload = {
  warehouseName: '',
  location: '',
  totalEmployees: 0,
};
const Warehouse = () => {
  const [isForm, setIsForm] = useState(false);
  const [formPayload, setFormPayload] = useState({ ...payload });

  const handleEdit = (row) => {
    setIsForm(true)
    setFormPayload({...row})
    console.log(row);
  };
  const handleDelete = (row) => {
    console.log(row);
  };

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name', // Use accessorKey for field-based lookup
      cell: (info) => info.getValue(), // Render the value directly
    },
    {
      header: 'Age',
      accessorKey: 'age',
      cell: (info) => info.getValue(),
    },
    {
      header: 'City',
      accessorKey: 'city',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Actions',
      cell: (info) => {
        const rowData = info.row.original; // Access row data
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
      meta: { width: '150px' },
    },
  ];
  const data = [
    { name: 'Alice', age: 30, city: 'New York' },
    { name: 'Bob', age: 25, city: 'Los Angeles' },
    { name: 'Charlie', age: 35, city: 'Chicago' },
  ];

  const handleChange = (e) => {
    const data = { ...payload };
    const { name, value } = e.target;
    data[name] = value;
    setFormPayload(data);
  };

  /*
Todo:
1. Create  a form
2. Create a table component  ot show data
3. Create a slice for warehouse
*/
  return (
    <div>
      {
        !isForm &&
      <button onClick={() => setIsForm(true)}>Create </button>
      }

      {isForm ? (
        <RenderWarehouseForm
          schema={formSchema}
          payload={formPayload}
          onCancel={() => setIsForm(false)}
          onSubmit={()=>{console.log("Submit")}}
          handleChange={handleChange}
        />
      ) : (
          <div>
            <TableComponent columns={columns} data={data}/>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
