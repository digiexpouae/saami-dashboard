import axios from 'axios';

const api = axios.create({
  baseURL: 'https://documenter.getpostman.com/view/32873772/2sAYJ6BK5A', // Replace with the actual base URL
});

// Define constants for API endpoints
const CREATE_EMPLOYEE = '/employees/create'; // Example endpoint for creating an employee
const GET_ALL_EMPLOYEE = '/employees'; // Example endpoint for getting all employees
const UPDATE_EMPLOYEE = '/employees/update'; // Example endpoint for updating an employee
const DELETE_EMPLOYEE = '/employees/delete'; // Example endpoint for deleting an employee

// Export the API instance and endpoints
export { api, CREATE_EMPLOYEE, GET_ALL_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE };
