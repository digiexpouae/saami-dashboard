import ApiWrapper from '@redux/asyncThunk';

export const createWarehouse = ApiWrapper(
  'warehouse:create',
  (data: { name: string }) => {
    console.log(data);
    return {
      method: 'POST',
      url: '/warehouse' + 3,
      data,
    };
  },
);

export const updateWarehouse = ApiWrapper('warehouse:update', (data) => {
  return {
    method: 'PUT',
    url: '/warehouse/',
    data,
  };
});

// can continue thunk functions like this
