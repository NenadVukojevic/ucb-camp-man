import axios from 'axios';


const CAMPAIGNS_API_BASE_URL = "http://localhost:8080/api/v1/";

class CampaignsService {

    getCampaigns() {
        return axios.get(CAMPAIGNS_API_BASE_URL + 'campaignsCRM');
    }

    getCampaignDetails(id){
        return axios.get(CAMPAIGNS_API_BASE_URL + 'campaignDetails/' + id);
    }
   
}

export default new CampaignsService();