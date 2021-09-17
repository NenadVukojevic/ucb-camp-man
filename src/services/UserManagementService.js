import axios from 'axios';


const CAMPAIGNS_API_BASE_URL = "http://localhost:8080/api/v1/user/management";

class UserManagementService {

    getRoles() {
        return axios.get(CAMPAIGNS_API_BASE_URL + '/roles', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getRole(id){
        return axios.get(CAMPAIGNS_API_BASE_URL + '/roles/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    saveRole(role){
        return axios.post(CAMPAIGNS_API_BASE_URL + '/roles', role, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }


    deleteRole(id){
        return axios.delete(CAMPAIGNS_API_BASE_URL + '/roles/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getGroups() {
        return axios.get(CAMPAIGNS_API_BASE_URL + '/groups', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }
   
    getGroup(id) {
        return axios.get(CAMPAIGNS_API_BASE_URL + '/group/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getGroupInit() {
        return axios.get(CAMPAIGNS_API_BASE_URL + '/group/init', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    saveGroup(group){
        return axios.post(CAMPAIGNS_API_BASE_URL + '/group/', group, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    deleteGroup(id){
        return axios.delete(CAMPAIGNS_API_BASE_URL + '/group/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getUsers(){
        return axios.get(CAMPAIGNS_API_BASE_URL + '/user', {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getUser(id){
        return axios.get(CAMPAIGNS_API_BASE_URL + '/user/' + id, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    getUserInit(){
        return axios.get(CAMPAIGNS_API_BASE_URL + '/user/init' , {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }

    saveUser(user){
        return axios.post(CAMPAIGNS_API_BASE_URL + '/user/', user, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        });
    }
}

export default new UserManagementService();