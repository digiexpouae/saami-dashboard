import React, { useState } from 'react';
import RenderEmployeeForm from '../../common/RenderForm/RenderForm';

const formSchema = [
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
    name: 'assignedWarehouse',
    label: 'Assign Warehouse',
    type: 'select',
    required: true,
    placeholder: 'Select Warehouse',
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
const Employee = () => {
  const [isForm, setIsForm] = useState(false);
  const [formPayload, setFormPayload] = useState({ ...payload });

  const handleChange = (e) => {
    const data = { ...payload };
    const { name, value } = e.target;
    data[name] = value;
    setFormPayload(data);
  };

  return (
    <div>
      <button onClick={() => setIsForm(true)}>Create </button>

      {isForm ? (
        <RenderEmployeeForm
          schema={formSchema}
          payload={formPayload}
          onCancel={() => setIsForm(false)}
          handleChange={handleChange}
        />
      ) : (
        <div>some table</div>
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
