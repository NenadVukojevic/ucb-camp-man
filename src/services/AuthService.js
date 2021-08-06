import axios from 'axios';
const CAMPAIGNS_API_BASE_URL = "http://localhost:8080/";



class AuthService  {
    login(credentials){
        return axios.post(CAMPAIGNS_API_BASE_URL + 'login', credentials);
    }
}

export default new AuthService();