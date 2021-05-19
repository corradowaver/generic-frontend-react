import axios from 'axios'
import {host} from "./HostAddress";

const EMPLOYEES_API_URL = host + '/api/employees'

class EmployeeDataService {

    retrieveAllEmployees() {
        return axios.get(`${EMPLOYEES_API_URL}`);
    }

    retrieveEmployee(id) {
        return axios.get(`${EMPLOYEES_API_URL}/${id}`);
    }

    deleteEmployee(id) {
        return axios.delete(`${EMPLOYEES_API_URL}/${id}`);
    }

    updateEmployee(id, employee) {
        return axios.put(`${EMPLOYEES_API_URL}/${id}`, employee);
    }

    createEmployee(employee) {
        return axios.post(`${EMPLOYEES_API_URL}`, employee);
    }

}

export default new EmployeeDataService()
