import axios from 'axios'
import {host} from "./HostAddress";

const PROJECTS_API_URL = host + '/api/projects'

class ProjectDataService {

    retrieveAllProjects() {
        return axios.get(`${PROJECTS_API_URL}`);
    }

    retrieveProject(id) {
        return axios.get(`${PROJECTS_API_URL}/${id}`);
    }

    deleteProject(id) {
        return axios.delete(`${PROJECTS_API_URL}/${id}`);
    }

    updateProject(id, project) {
        return axios.put(`${PROJECTS_API_URL}/${id}`, project);
    }

    createProject(project) {
        return axios.post(`${PROJECTS_API_URL}`, project);
    }

}

export default new ProjectDataService()
