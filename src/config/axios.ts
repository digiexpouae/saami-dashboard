import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

const CREATE_EMPLOYEE = '/676b2617a1c0f0fee40a49d0'; // Example endpoint for creating an employee
const GET_ALL_EMPLOYEE = '/676b2617a1c0f0fee40a49d0'; // Example endpoint for getting all employees
const UPDATE_EMPLOYEE = '/676da56a8174e79b59758f51'; // Example endpoint for updating an employee
const DELETE_EMPLOYEE = '/676dbb2812c022e683226879'; // Example endpoint for deleting an employee
export { api, CREATE_EMPLOYEE, GET_ALL_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE };
export default api;






