import httpService from './httpService';
const endpoint = 'api/posts'

export default{
    query
}

function query(){
    return httpService.get(endpoint)
}