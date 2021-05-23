import axios from 'axios'
import {host} from "./HostAddress";

export default class DataService {
    constructor (endpoint) {
        this.endpoint = endpoint
        this.url = host + `${endpoint}`
    }

    retrieveAll() {
        return axios.get(`${this.url}`);
    }

    retrieve(id) {
        return axios.get(`${this.url}/${id}`);
    }

    delete(id) {
        return axios.delete(`${this.url}/${id}`);
    }

    update(object) {
        return axios.put(`${this.url}`, object);
    }

    create(object) {
        return axios.post(`${this.url}`, object);
    }

    retrieveTemplate() {
        return axios.get(`${this.url}/template`);
    }

}
