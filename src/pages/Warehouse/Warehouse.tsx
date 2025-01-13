import React, { useState, useEffect } from 'react';
import RenderWarehouseForm from '../../common/RenderForm/RenderForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from '../../sliceApi/warehouseSlice';
import { RootState } from '../redux/store';
import TableComponent from '../../common/DataGrid/DataGrid';

const formSchema = [
  {
    name: 'name',
    label: 'Warehouse Name',
    type: 'text',
    required: true,
    placeholder: 'Enter warehouse name',
  },
  {
    name: 'latitude',
    label: 'Latitude',
    type: 'number',
    required: true,
    placeholder: 'Enter latitude',
  },
  {
    name: 'longitude',
    label: 'Longitude',
    type: 'number',
    required: true,
    placeholder: 'Enter longitude',
  },
];

const defaultPayload = {
  name: '',
  latitude: 0,
  longitude: 0,
};

// Define the type for formPayload
interface FormPayload {
  id?: string; // Make id optional if it's not always present
  name: string;
  latitude: number;
  longitude: number;
}

const Warehouse = () => {
  const dispatch = useDispatch<any>();
  const warehouses = useSelector(
    (state: RootState) => state.warehouse.warehouses,
  );

  // Retrieve token from local storage
  const token = localStorage.getItem('authToken');

  const [isForm, setIsForm] = useState(false);
  const [formPayload, setFormPayload] = useState<FormPayload>({
    ...defaultPayload,
  });

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      id: formPayload.id,
      name: formPayload.name,
      location: {
        latitude: formPayload.latitude,
        longitude: formPayload.longitude,
      },
    };

    if (formPayload.id) {
      dispatch(updateWarehouse({ updatedWarehouse: payload, token }))
        .then(() => {
          dispatch(fetchWarehouses());
        })
        .catch((error) => {
          console.error('Update error:', error);
        });
    } else {
      dispatch(createWarehouse({ payload, token }))
        .then(() => {
          dispatch(fetchWarehouses());
        })
        .catch((error) => {
          console.error('Creation error:', error);
        });
    }

    setIsForm(false);
    setFormPayload({ ...defaultPayload });
  };

  // console.log(token);

  const handleEdit = (row) => {
    console.log(row);

    setIsForm(true);
    setFormPayload({
      id: row._id,
      name: row.name,
      latitude: row.location.latitude,
      longitude: row.location.longitude,
   
    });
    console.log(row._id);

    console.log(formPayload);
  };

  const handleDelete = (row) => {
    dispatch(deleteWarehouse({ id: row._id, token }))
      .then(() => {
        dispatch(fetchWarehouses()); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error('Delete error:', error);
      });
  };

  const columns = [
    {
      header: 'Warehouse Name',
      accessorKey: 'name',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Location',
      cell: (info) => {
        const location = info.row.original.location || {};
        const { latitude = 'N/A', longitude = 'N/A' } = location;
        return `${latitude}, ${longitude}`;
      },
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
  // console.log(columns);
  // console.log(warehouses);
  return (
    <div>
      {!isForm ? (
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white"
          onClick={() => setIsForm(true)}
        >
          Create Warehouse
        </button>
      ) : null}

      {isForm ? (
        <RenderWarehouseForm
          schema={formSchema}
          payload={formPayload}
          onCancel={() => {
            setIsForm(false);
            setFormPayload({ ...defaultPayload });
          }}
          onSubmit={handleSubmit}
          handleChange={handleChange}
        />
      ) : (
        <TableComponent columns={columns} data={warehouses} />
      )}
    </div>
  );
};

export default Warehouse;
