import axios from 'axios';


const CAMPAIGNS_API_BASE_URL = "http://localhost:8080/api/v1/";

class CampaignsService {

    getCampaigns() {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'campaignsCRM', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getCampaignDetails(id) {
        //return axios.get(CAMPAIGNS_API_BASE_URL + 'campaignDetails/' + id, {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'campaign/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getCampaingResponses(id){
        return axios.get(CAMPAIGNS_API_BASE_URL + 'responseCRM/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);
        console.log(JSON.stringify(formData));
        return axios.post(CAMPAIGNS_API_BASE_URL + 'campaigns/image',
            formData, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    saveCampaign(campaign, campaignId) {
        return axios.put(CAMPAIGNS_API_BASE_URL + 'campaigns/' + campaignId,
            campaign, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

}

export default new CampaignsService();