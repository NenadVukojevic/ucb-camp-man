import axios from 'axios';


const CAMPAIGNS_API_BASE_URL = "http://localhost:8080/api/v1/";

class CampaignsService {

    getResponses() {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'off/responses', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getResponsesDTO() {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'off/responsesDTO', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getResponse(id) {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'off/responses/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    addResponse(response) {
        return axios.post(CAMPAIGNS_API_BASE_URL + 'off/responses', response, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    updateResponse(response) {
        return axios.put(CAMPAIGNS_API_BASE_URL + 'off/responses', response, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getStatuses() {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'off/statuses', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getCampaigns() {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'off/', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getCampaign(id) {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'off/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    insertCampaign(campaign) {
        return axios.post(CAMPAIGNS_API_BASE_URL + 'off/', campaign, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }
}

export default new CampaignsService();