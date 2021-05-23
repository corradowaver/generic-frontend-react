import axios from 'axios'
import {host} from "./HostAddress";
import {APP_CONFIG_NAVIGATION_LINK} from "../component/NavigationConsts";

const APP_CONFIG_API_URL = host + `${APP_CONFIG_NAVIGATION_LINK}`

class ApplicationService {

    retrieveConfig() {
        return axios.get(`${APP_CONFIG_API_URL}`);
    }
}

export default new ApplicationService()
