import axios from 'axios';


const CAMPAIGNS_API_BASE_URL = "http://localhost:8080/api/v1/";

class TerminalsService {

    getTerminals() {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'terminals', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }
  
    getTerminalGroups(){
        return axios.get(CAMPAIGNS_API_BASE_URL + 'terminalGroup', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getTerminalGroup(id){
        return axios.get(CAMPAIGNS_API_BASE_URL + 'terminalGroup/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    addTerminalGroup(group){
        return axios.post(CAMPAIGNS_API_BASE_URL + 'terminalGroup/' , group, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    updateTerminalGroup(group){
        return axios.put(CAMPAIGNS_API_BASE_URL + 'terminalGroup/' , group, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }
}

export default new TerminalsService();