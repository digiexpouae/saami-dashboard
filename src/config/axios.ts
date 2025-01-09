import axios from 'axios';

const api = axios.create({
  baseURL: 'http://testapi.145.223.21.85.sslip.io/api',
});

const GET_ALL_WAREHOUSE = '/warehouses';
const CREATE_WAREHOUSE = '/warehouses';
const UPDATE_WAREHOUSE = '/warehouses';
const DELETE_WAREHOUSE = '/warehouses';

const CREATE_EMPLOYEE = '/users'; // Example endpoint for creating an employee
const GET_ALL_EMPLOYEE = '/users'; // Example endpoint for getting all employees
const UPDATE_EMPLOYEE = '/users'; // Example endpoint for updating an employee
const DELETE_EMPLOYEE = '/users'; // Example endpoint for deleting an employee
export { api, CREATE_EMPLOYEE, GET_ALL_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE,GET_ALL_WAREHOUSE, CREATE_WAREHOUSE, UPDATE_WAREHOUSE, DELETE_WAREHOUSE };






