import axios from 'axios';


const CAMPAIGNS_API_BASE_URL = "http://localhost:8080/api/v1/campaignsCRM";

class CampaignsService {

    getCampaigns() {
        return axios.get(CAMPAIGNS_API_BASE_URL);
    }

       
}

export default new CampaignsService();