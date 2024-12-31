import React, { useState, useEffect } from 'react';
import RenderEmployeeForm from '../../common/RenderForm/RenderForm';
import TableComponent from '../../common/DataGrid/DataGrid';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWarehouses } from '../../sliceApi/warehouseSlice';
import { createEmployee, getEmployees, updateEmployee, deleteEmployee } from '../../slice/employee'; // Import slice actions
import { RootState } from '../redux/store';

const baseSchema = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    condition: true, // This will be updated dynamically based on `isEditMode`
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    options: [
      { value: 'employee', label: 'Employee' },
      { value: 'warehouse_manager', label: 'Warehouse Manager' }, 
    ],
  },
  {
    name: 'assignedWarehouse',
    label: 'Assigned Warehouse',
    type: 'select',
    required: true,
    options: [], // Will be populated dynamically
  },
];

const Employee = () => {
  const dispatch = useDispatch<any>();
  const warehouses = useSelector((state: RootState) => state.warehouse.warehouses);
  const employees = useSelector((state: RootState) => state.employee.employees);

  const [isForm, setIsForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Moved inside the component
  const [formPayload, setFormPayload] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    assignedWarehouse: '',
  });

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(fetchWarehouses());
  }, [dispatch]);

  // Create dynamic form schema with populated warehouse options
// Create dynamic form schema with conditionally included password field
const formSchema = warehouses.length
  ? baseSchema
      .filter((field) => !(isEditMode && field.name === 'password')) // Exclude password field in edit mode
      .map((field) =>
        field.name === 'assignedWarehouse'
          ? {
              ...field,
              options: warehouses.map((warehouse) => ({
                value: warehouse._id,
                label: warehouse.name,
              })),
            }
          : field
      )
  : baseSchema.filter((field) => !(isEditMode && field.name === 'password')); // Also exclude in fallback case


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { username, email, password, role, assignedWarehouse, id } = formPayload;

    if (!username || !email || !role || !assignedWarehouse || (!isEditMode && !password)) {
      alert('Please fill in all required fields');
      return;
    }

    const payload = isEditMode
      ? { id, username, email, role, assignedWarehouse }
      : { username, email, password, role, assignedWarehouse };

    const actionToDispatch = isEditMode ? updateEmployee : createEmployee;

    dispatch(actionToDispatch(payload))
      .then(() => {
        dispatch(getEmployees());
        // alert(isEditMode ? 'Employee updated successfully' : 'Employee created successfully');
      })
      .catch((error) => {
        alert(`Failed to ${isEditMode ? 'update' : 'create'} employee: ${error}`);
      });

    setIsForm(false);
    setIsEditMode(false);
    setFormPayload({
      username: '',
      email: '',
      password: '',
      role: '',
      assignedWarehouse: '',
    });
  };

  const handleEdit = (row) => {
    setIsForm(true);
    setIsEditMode(true);
    setFormPayload({
      id: row._id,
      username: row.username,
      email: row.email,
      role: row.role,
      assignedWarehouse: row.assignedWarehouse?._id || '',
    });
  };

const handleDelete = (employee) => {
  const confirmDelete = window.confirm(`Are you sure you want to delete ${employee.username}?`);
  if (confirmDelete) {
    dispatch(deleteEmployee(employee._id))
      .then(() => {
        alert(`${employee.username} has been successfully deleted.`);
        dispatch(getEmployees()); // Refresh the employee list after deletion
      })
      .catch((error) => {
        alert(`Failed to delete employee: ${error.message}`);
      });
  }
};

  const columns = [
    { header: 'Employee Name', accessorKey: 'username' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
    {
      header: 'Assigned Warehouse',
      cell: ({ row }) => row.original.assignedWarehouse?.name || 'N/A',
    },
    {
      header: 'Actions',
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="flex gap-2">
            <button className="text-blue-500" onClick={() => handleEdit(rowData)}>
              Edit
            </button>
            <button className="text-red-500" onClick={() => handleDelete(rowData)}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <button onClick={() => setIsForm(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white">
        Create Employee
      </button>

      {isForm ? (
        <RenderEmployeeForm
          schema={formSchema}
          payload={formPayload}
          onCancel={() => setIsForm(false)}
          handleChange={handleChange}
          onSubmit={handleSubmit}
        />
      ) : (
        <TableComponent columns={columns} data={employees} />
      )}
    </div>
  );
};

export default Employee;
