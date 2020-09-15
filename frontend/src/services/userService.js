import httpService from './httpService';

const usersEndpoint = 'api/users';
const authEndpoint = 'api/auth';

export default{
    query,
    login,
    logout,
    signup
}

function query(){
    return httpService.get(usersEndpoint);
}




//Auth Service 

function login(userCred){
    return httpService.post(`${authEndpoint}/login`, userCred)
}

function signup(userCred){
    return httpService.post(`${authEndpoint}/signup`, userCred)
}

function logout(){
    httpService.post(`${authEndpoint}/logout`);
}