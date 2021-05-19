import axios from 'axios'
import {host} from "./HostAddress";
import {WARDS_NAVIGATION_LINK} from "../component/NavigationConsts";

const WARDS_API_URL = host + `/api${WARDS_NAVIGATION_LINK}`

class WardDataService {

    retrieveAll() {
        return axios.get(`${WARDS_API_URL}`);
    }

    retrieve(id) {
        return axios.get(`${WARDS_API_URL}/${id}`);
    }

    delete(id) {
        return axios.delete(`${WARDS_API_URL}/${id}`);
    }

    update(id, department) {
        return axios.put(`${WARDS_API_URL}/${id}`);
    }

    create(department) {
        return axios.post(`${WARDS_API_URL}`, department);
    }

}

export default new WardDataService()
