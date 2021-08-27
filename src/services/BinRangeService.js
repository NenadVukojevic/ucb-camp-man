import axios from 'axios';


const CAMPAIGNS_API_BASE_URL = "http://localhost:8080/api/v1/binRanges";

class BinRangeService {

    getBinRangeGroups() {
        return axios.get(CAMPAIGNS_API_BASE_URL + '/groups', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getBinRangeGroup(id) {
        return axios.get(CAMPAIGNS_API_BASE_URL + '/groups/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getBinRanges() {
        return axios.get(CAMPAIGNS_API_BASE_URL + '/', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    addGroup(group) {
        return axios.post(CAMPAIGNS_API_BASE_URL + '/groups', group, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    updateGroup(group) {
        return axios.put(CAMPAIGNS_API_BASE_URL + '/groups', group, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }
}

export default new BinRangeService();